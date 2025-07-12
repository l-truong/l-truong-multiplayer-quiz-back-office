import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';

export abstract class QuestionService {
    abstract getQuestions(): Observable<Question[]>;
    abstract getQuestion(id: string): Observable<Question | undefined>;
    abstract addQuestion(question: Question): Observable<Question>;  
    abstract updateQuestion(id: string, question: Question): Observable<Question>;
    abstract deleteQuestion(id: string): Observable<void>;
}