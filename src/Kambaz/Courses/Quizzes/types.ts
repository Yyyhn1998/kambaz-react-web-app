export const questionTypes = ["Multiple Choice", "True/False", "Fill in the Blank"] as const;


export type QuestionType = typeof questionTypes[number];


export interface Question {
    _id?: string;
    text: string;
    type: QuestionType;
    title: string;
    answer: string;
    points: number;
    choices: string[];
    caseSensitive?: boolean;
    correctAnswer?: number;
}

export type QuizType = {
    _id?: string;
    course: string;
    title: string;
    description?: string;
    questions: Question[];
    dueDate?: string;
    timeLimit?: number;
    assignmentGroup?: string;
    quizType?: string;
    attempts?: number;
    multipleAttempts?: boolean;
    shuffleAnswers?: boolean;
    availableDate?: string;
    untilDate?: string;
    published?: boolean;
    points?: number;
    oneQuestionAtATime?: boolean;
    webcamRequired?: boolean;
    lockQuestionsAfterAnswering?: boolean;
    showCorrectAnswers?: boolean;
}

export interface QuizAttempt {
    _id?: string;
    quizId: string;
    userId: string;
    // eslint-disable-next-line
    answers: Record<string, any>;
    score: number;
    percentageScore?: number;
    submittedAt: string;
    isPreview?: boolean;
}
