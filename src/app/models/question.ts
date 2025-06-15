export interface Question {
    questionId: string,
    questionText: string,
    options: string[],
    correctAnswer: string,
    explanation: string,
    categoryId: string,
    imageUrl: string
}