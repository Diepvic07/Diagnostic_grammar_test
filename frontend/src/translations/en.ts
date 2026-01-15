// English translations
export const en = {
    // Landing Page
    landing: {
        headline: "Check your English Grammar Level",
        subheadline: "Take our 50-question diagnostic test. Get detailed feedback and personalized study plans.",
        startButton: "Start Quiz Now",
        login: "Log in",
        learnMore: "Learn More"
    },

    // Quiz Page
    quiz: {
        question: "Question",
        of: "of",
        completed: "completed",
        nextQuestion: "Next Question",
        submit: "Get Results",
        close: "Close"
    },

    // Results Page
    results: {
        title: "Results & Analysis",
        testComplete: "Test Complete! 🎉",
        congratulations: "Great job! You've mastered the basics!",
        pushStrong: "Let's push you to finish strong.",
        outOf: "out of",
        totalScore: "TOTAL SCORE",
        accuracy: "Accuracy",
        passingScore: "PASSING SCORE",
        retakeTest: "Retake Test",
        viewStudyPlan: "View Study Plan",
        reviewAnswers: "Review Your Answers",
        yourAnswer: "YOUR ANSWER",
        correctAnswer: "CORRECT ANSWER",
        whyWrong: "WHY THIS IS WRONG",
        whyCorrect: "WHY THIS IS CORRECT",
        questionLabel: "Question"
    },

    // Study Plan extended
    topics: {
        futurePerfect: "Future Perfect",
        presentSimple: "Present Simple",
        passiveVoice: "Passive Voice",
        conditionals: "Conditionals",
        // New topics from grammar_resources.json
        presentTenses: "Present tenses",
        pastTenses1: "Past tenses 1",
        presentPerfect: "Present perfect",
        pastTenses2: "Past tenses 2",
        future1: "Future 1",
        future2: "Future 2",
        countableAndUncountableNouns: "Countable and uncountable nouns",
        referringToNouns: "Referring to nouns",
        pronounsAndReferencing: "Pronouns and referencing",
        adjectivesAndAdverbs: "Adjectives and adverbs",
        comparingThings: "Comparing things",
        theNounPhrase: "The noun phrase",
        modals1: "Modals 1",
        modals2: "Modals 2",
        reportedSpeech: "Reported speech",
        verbVerbPatterns: "Verb + verb patterns",
        likelihoodBasedOnConditions1: "Likelihood based on conditions 1",
        likelihoodBasedOnConditions2: "Likelihood based on conditions 2",
        prepositions: "Prepositions",
        relativeClauses: "Relative clauses",
        waysOfOrganisingTexts: "Ways of organising texts",
        thePassive: "The passive",
        linkingIdeas: "Linking ideas",
        showingYourPositionInAText: "Showing your position in a text",
        nominalisationInWrittenEnglish: "Nominalisation in written English"
    },

    // Dynamic strings
    studyPlan: {
        title: "Study Plan",
        personalizedTitle: "Your Personalized Study Plan",
        subtitle: "Focus on these topics to level up your English.",
        ieltsLabel: "IELTS RECOMMENDED",
        ieltsTitle: "Grammar for IELTS",
        ejoyLabel: "eJOY OFFICIAL",
        ejoyTitle: "Practice on eJOY",
        weakTopics: "WEAK GRAMMAR TOPICS",
        priority: "PRIORITY",
        studyReference: "Grammar for IELTS book",
        studyReferenceDefault: "Grammar Guide: {{topic}}",
        studyReferenceDetail: "Grammar Guide - {{topic}}",
        practiceOnEjoy: "PRACTICE ON EJOY",
        practiceButton: "Practice {{topic}} with eJOY",
        continue: "Continue",
        continueButton: "Email me my plan"
    },

    // Email Success Page
    emailSuccess: {
        title: "Study Plan Sent!",
        message: "We've sent your personalized results and study plan to your inbox. Please check your spam folder if you don't see it.",
        notReceived: "Didn't receive it?",
        contactSupport: "Contact Support",
        retake: "Retake the test"
    },

    // Email Request Page
    emailRequest: {
        title: "Get Your Plan & Gift Code",
        immediateAccess: "IMMEDIATE ACCESS",
        downloadPdf: "Download Free PDF Plan",
        downloadDesc: "Get your personalized grammar diagnostic results as a PDF instantly.",
        downloadBtn: "Download PDF",
        freeReady: "Free & Ready Now",
        emailGift: "EMAIL & SPECIAL GIFT",
        onlyLeft: "Only 100 left!",
        limitedOffer: "LIMITED OFFER",
        emailTitle: "Email Results & Get 7-Day Gift",
        emailDesc: "Receive your full study plan and a gift code for immersive video lessons.",
        fullName: "Full Name",
        namePlaceholder: "Enter your name",
        emailAddr: "Email Address",
        emailPlaceholder: "name@example.com",
        phoneNum: "Phone Number",
        phonePlaceholder: "+1 (555) 000-0000",
        submitBtn: "Send study plan & gift code",
        sending: "Sending...",
        privacy: "We'll never share your details with third parties.",
        phoneError: "Please enter a valid phone number"
    },

    // Common
    common: {
        loading: "Loading...",
        error: "An error occurred",
        back: "Back",
        menu: "Menu"
    }
};

export type Translation = typeof en;
