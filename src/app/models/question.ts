export interface Question {
    _id: string,
    questionId: string,
    questionText: string,
    options: string[],
    correctAnswer: string,
    explanation: string,
    categoryId: string,
    imageUrl: string
    createdAt: string,
    updatedAt: string
}