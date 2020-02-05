import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewRegistration } from './models/newregistration';
import { Loginuser } from './models/loginuser';
import { QuestionsData } from './models/questionsData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:4600/jmit/test";
  constructor(private httpClient: HttpClient) { }

  createLoginId(loginData: NewRegistration) {
    return this.httpClient.post(this.baseUrl + '/createId/', loginData);  
  }
  isLoginId(loginDatas: Loginuser) {
    return this.httpClient.post(this.baseUrl + '/signIn/', loginDatas);  
  }
  getUser() {
    return this.httpClient.get<QuestionsData[]>(this.baseUrl + '/getall/questions');
  }


  questionsPagination(page: number) {
    return this.httpClient.get<QuestionsData[]>(this.baseUrl + '/getPage/questions/' + page);
  }
  totalPageQuestions() {
    return this.httpClient.get<Number>(this.baseUrl + '/getTotalPage/questions');
  }

  updatePassword(email: string, body: NewRegistration) {
    return this.httpClient.put(this.baseUrl + '/search/email/' + email , body);
  }

  updateHighestScore(id: string, body: NewRegistration) {
    return this.httpClient.put(this.baseUrl + '/updateScore/' + id , body);
  }


}
 