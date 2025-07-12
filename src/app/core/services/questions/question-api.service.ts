import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { config } from 'src/app/config/backofficeConfig.config';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService implements QuestionService {

    private apiUrl = config.api.baseUrl + '/questions';  

    constructor(private http: HttpClient) {}

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.apiUrl);
    }

    getQuestion(id: string): Observable<Question> {
        return this.http.get<Question>(`${this.apiUrl}/${id}`);
    }

    addQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(this.apiUrl, question, { headers: this.getHeaders() });
    }

    updateQuestion(id: string, updatedQuestion: Question): Observable<Question> {
        return this.http.patch<Question>(`${this.apiUrl}/${id}`, updatedQuestion, { headers: this.getHeaders() });
    }

    deleteQuestion(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
}