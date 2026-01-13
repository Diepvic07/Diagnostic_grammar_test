import { useState, useEffect } from 'react'
import './styles/global.css'
import './styles/components.css'
import { LandingPage } from './pages/LandingPage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { StudyPlanPage } from './pages/StudyPlanPage'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Header } from './components/Header'

import { identifyWeakAreas } from './utils/scoring';
import type { QuizResultsResponse } from './types'

// ... imports
import grammarResourcesRaw from './data/grammar_resources.json';
import { EmailRequestPage } from './pages/EmailRequestPage';
import { EmailSuccessPage } from './pages/EmailSuccessPage';
import { EmailFailedPage } from './pages/EmailFailedPage';
import { AnalyticsService } from './services/AnalyticsService';

// Type assertion for the imported JSON
const grammarResources = grammarResourcesRaw as Record<string, { bookDetails: string; videoUrl?: string; videoTitle?: string }>;

const identifyWeakTopicsDetailed = (questions: any[]) => {
  const weakAreas = identifyWeakAreas(questions);
  return weakAreas.map(area => {
    const resource = grammarResources[area.topicName];
    return {
      name: area.topicName,
      priority: "High Priority", // Defaulting to high for now
      bookReference: resource?.bookDetails || `Review ${area.topicName}`,
      video: resource?.videoUrl ? {
        title: resource.videoTitle || `Watch: ${area.topicName}`,
        url: resource.videoUrl
      } : null
    };
  });
};

type Page = 'landing' | 'quiz' | 'results' | 'study-plan' | 'email-request' | 'email-success' | 'email-failed';

function Main() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [quizResults, setQuizResults] = useState<QuizResultsResponse | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { language } = useLanguage();
  console.log("Current Language:", language); // Use variable to silence linter


  const handleQuizComplete = async (_sessionId: string, answers: any[], questionsData: any[]) => {
    try {
      // 1. Calculate Score Locally
      // Map answers to UserAnswer type expected by scoring util
      // Use the questions data passed from QuizPage (which handles language loading)


      const detailedAnswers = answers.map(a => {
        const question = questionsData.find(q => q.id === a.questionId);
        const selected = question?.answers.find((ans: any) => ans.id === a.selectedAnswerId);
        // For JSON data, find correct answer by checking isCorrect property
        const correct = question?.answers.find((ans: any) => ans.isCorrect);

        return {
          questionId: a.questionId,
          questionText: question?.contentEn || '',
          selectedAnswer: selected?.textEn || '',
          correctAnswer: correct?.textEn || '',
          isCorrect: selected?.isCorrect || false,
          explanation: question?.explanationEn || '',
          grammarTopic: question?.grammarTopic || '',
          topicNumber: 0, // Not in current local data, defaults to 0
          timeTaken: 0, // If we tracked time per question
          selectedAnswerId: a.selectedAnswerId
        };
      });

      const correctCount = detailedAnswers.filter(a => a.isCorrect).length;
      const results: QuizResultsResponse = {
        score: correctCount,
        totalQuestions: 50,
        percentage: Math.round((correctCount / 50) * 100),
        questions: detailedAnswers.map(a => ({
          id: a.questionId,
          questionText: a.questionText,
          userAnswer: a.selectedAnswer,
          correctAnswer: a.correctAnswer,
          isCorrect: a.isCorrect,
          explanation: a.explanation,
          grammarTopic: a.grammarTopic,
          topicNumber: a.topicNumber
        }))
      };

      setQuizResults(results);
      setCurrentPage('results');

      // Background: We can still trigger AnalyticsService here if we want immediate data safety,
      // but waiting for the Email Request form (Step 2) is better as we get student info.

    } catch (error) {
      console.error('Failed to complete quiz:', error);
      alert('Error processing results.');
    }
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setCurrentPage('quiz');
  };

  const handleViewStudyPlan = () => {
    setCurrentPage('study-plan');
  };

  useEffect(() => {
    // Expose test helper
    (window as any).fastTrackQuiz = () => {
      // ... (existing helper logic) ...
      const mockResults: QuizResultsResponse = {
        score: 0,
        totalQuestions: 50,
        percentage: 0,
        questions: []
      };
      setQuizResults(mockResults);
      setCurrentPage('results');
    };

    // Check for "topics" in URL (Stateless Sharing)
    const params = new URLSearchParams(window.location.search);
    const topicsParam = params.get('topics');
    if (topicsParam) {
      // topics=Present tenses,Past tenses 1
      const topicNames = topicsParam.split(',');
      const mockQuestions = topicNames.map((name, index) => ({
        id: `shared-${index}`,
        questionText: "Shared Plan",
        userAnswer: "",
        correctAnswer: "",
        isCorrect: false,
        explanation: "",
        grammarTopic: name.trim(),
        topicNumber: 0
      }));

      // Construct a partial result that is sufficient for StudyPlanPage
      const sharedResults: QuizResultsResponse = {
        score: 0,
        totalQuestions: 50,
        percentage: 0,
        questions: mockQuestions
      };

      setQuizResults(sharedResults);
      setCurrentPage('study-plan');
    }
  }, []);

  const handleSendEmail = async (contactData: { name: string; email: string; phone?: string }) => {
    if (!quizResults) return;
    setIsSendingEmail(true);

    try {
      // Prepare questions for helper
      const mappedQuestions = quizResults.questions.map(q => ({
        questionId: q.id,
        selectedAnswer: q.userAnswer || "",
        correctAnswer: q.correctAnswer || "",
        isCorrect: q.isCorrect,
        timeTaken: 0,
        grammarTopic: q.grammarTopic
      }));

      const weakTopics = identifyWeakTopicsDetailed(mappedQuestions);

      const responses = quizResults.questions.map(q => ({
        questionId: q.id,
        topic: q.grammarTopic,
        correct: q.isCorrect,
        selectedAnswer: q.userAnswer || "",
        // Mock time if not tracked
        timeSpent: 10000
      }));

      const payload = {
        attemptId: crypto.randomUUID(),
        student: {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone
        },
        score: {
          total: quizResults.score,
          max: quizResults.totalQuestions,
          cefr: quizResults.percentage > 80 ? "B2" : (quizResults.percentage > 50 ? "B1" : "A2")
        },
        attempt: {
          duration: quizResults.totalQuestions * 15
        },
        weakTopics: weakTopics, // Now limited to top 5
        responses: responses,
        studyPlan: weakTopics.map(t =>
          `Topic: ${t.name} | Book: ${t.bookReference} | Video: ${t.video ? t.video.url : 'N/A'}`
        ).join('\n'),
        studyPlanLink: `${window.location.origin}${window.location.pathname}?topics=${encodeURIComponent(weakTopics.map(t => t.name).join(','))}`
      };

      const success = await AnalyticsService.submitResults(payload);
      if (success) {
        setCurrentPage('email-success');
      } else {
        setCurrentPage('email-failed');
      }
    } catch (error) {
      console.error("Email send failed", error);
      setCurrentPage('email-failed');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const renderPage = () => {
    // Calculate weak topics once if results exist
    const currentWeakTopics = quizResults ? identifyWeakAreas(quizResults.questions.map(q => ({
      questionId: q.id,
      selectedAnswer: q.userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: q.isCorrect,
      timeTaken: 0,
      grammarTopic: q.grammarTopic
    }))) : [];

    switch (currentPage) {
      case 'landing':
        return <LandingPage onStartQuiz={() => setCurrentPage('quiz')} />;
      case 'quiz':
        return <QuizPage onQuizComplete={handleQuizComplete} />;
      case 'results':
        return (
          <ResultsPage
            results={quizResults}
            onRetakeQuiz={handleRetakeQuiz}
            onViewStudyPlan={handleViewStudyPlan}
          />
        );
      case 'study-plan':
        return (
          <StudyPlanPage
            weakTopics={currentWeakTopics}
            onContinue={() => setCurrentPage('email-request')}
          />
        );
      case 'email-request':
        return (
          <EmailRequestPage
            onBack={() => setCurrentPage('study-plan')}
            onSubmit={handleSendEmail}
            isLoading={isSendingEmail}
            weakTopics={currentWeakTopics}
          />
        );
      case 'email-success':
        return (
          <EmailSuccessPage
            onClose={() => setCurrentPage('landing')} // or results?
            onRetake={handleRetakeQuiz}
          />
        );
      case 'email-failed':
        return (
          <EmailFailedPage
            onBack={() => setCurrentPage('email-request')}
            onRetake={handleRetakeQuiz}
          />
        );
      default:
        return <LandingPage onStartQuiz={() => setCurrentPage('quiz')} />;
    }
  };

  return (
    <>
      <Header />

      {renderPage()}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Main />
    </LanguageProvider>
  );
}

export default App;
