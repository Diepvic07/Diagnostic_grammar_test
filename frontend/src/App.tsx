import { useState, useEffect } from 'react'
import './styles/global.css'
import './styles/components.css'
import { LandingPage } from './pages/LandingPage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { StudyPlanPage } from './pages/StudyPlanPage'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Header } from './components/Header'
import { DemoNav } from './components/DemoNav'
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


  const handleQuizComplete = async (_sessionId: string, answers: any[]) => {
    try {
      // 1. Calculate Score Locally
      // Map answers to UserAnswer type expected by scoring util
      const questionsData = (await import('./data/questions')).questions;

      const detailedAnswers = answers.map(a => {
        const question = questionsData.find(q => q.id === a.questionId);
        const selected = question?.answers.find(ans => ans.id === a.selectedAnswerId);
        const correct = question?.answers.find(ans => ans.isCorrect);

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

  // Expose test helper for Automation
  // Expose test helper for Automation
  useEffect(() => {
    (window as any).fastTrackQuiz = () => {
      const mockResults: QuizResultsResponse = {
        score: 42,
        totalQuestions: 50,
        percentage: 84,
        questions: Array(50).fill(null).map((_, i) => ({
          id: `q${i}`,
          questionText: `Mock Question ${i}`,
          userAnswer: "A",
          correctAnswer: "B", // Different answer
          isCorrect: i % 2 === 0, // 50% correct
          explanation: "Mock Explanation",
          grammarTopic: `Topic ${i % 5}`, // 5 topics
          topicNumber: 1
        }))
      };
      setQuizResults(mockResults);
      setCurrentPage('results');
      console.log("Quiz Fast Tracked!");
    };

    // Check for Plan ID in URL (Deep Linking)
    // Legacy: This was for checking backend for past results. 
    // For static site, we can't fetch by ID unless we query Google Sheets (which is async and complex for this scope)
    // or if we passed encoded data. 
    // For now, we will just log it or ignore.
    const params = new URLSearchParams(window.location.search);
    const planId = params.get('planId');
    if (planId) {
      console.log("Loaded with plan ID:", planId);
      // Potential future enhancement: fetch from Google Sheet via Apps Script based on ID
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
        ).join('\n')
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
      <DemoNav onNavigate={setCurrentPage} />
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
