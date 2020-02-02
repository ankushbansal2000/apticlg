import { CountCorrectAnswer } from './../../models/countquestion';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { QuestionsData } from 'src/app/models/questionsData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  questionsData: QuestionsData[];
  verifyAnswer: QuestionsData;
  data: QuestionsData[];
  page: number = 1;
  totalQuestionsNumber: number = 0;
  CorrectAnswer: Array<number> = [];
  SkipAnswer: Array<number> = [];
  WrongAnswer: Array<number> = [];
  isNextQuestion: boolean = true;
  isResult: boolean;
  totalAnswer: number;
  totalQuestions: number;
  array: Array<number> = [];
  timeLeft: number = 13;
  interval;
  isTimePeriod: boolean = true;

  constructor(private apiService: AuthService, public router: Router) {
    this.verifyAnswer = new QuestionsData;
  }

  ngOnInit() {
    this.pagination(this.page);
    this.totalPage();
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 13;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.page === this.totalQuestions) {
          this.skipSubmit();
          this.isTimePeriod = false;
        } else {
          this.skip();
          this.page = this.page + 1;
          this.timeLeft = 13;
        }
      }
    }, 1000)
  }

  totalPage() {
    this.apiService.totalPageQuestions()
      .subscribe((data: number) => {
        this.totalQuestions = data;
        this.CheckedQuestion();
      });
  }

  pagination(page: number) {
    this.apiService.questionsPagination(page)
      .subscribe((data: QuestionsData[]) => {
        this.questionsData = data;
      });
  }

  CheckedQuestion() {
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.array.push(i);
    }
  }

  onNextQuestion(data: QuestionsData) {
    this.questionsData.forEach(function (value) {
      data.correctAnswer = value.correctAnswer
    });
    if (data._id === data.correctAnswer) {
      this.CorrectAnswer.push(this.page);
      this.totalQuestionsNumber += 10;
    } else {
   this.WrongAnswer.push(this.page);
    }
    this.verifyAnswer = new QuestionsData;
    this.page = this.page + 1;
    if (this.page === this.totalQuestions) {
      this.pagination(this.page);
      this.isNextQuestion = false;
    } else {
      this.pagination(this.page);
    }
    clearInterval(this.interval);
    this.startTimer();
  }

  onSubmit(data: QuestionsData) {
    this.questionsData.forEach(function (value) {
      data.correctAnswer = value.correctAnswer
    });
    if (data._id === data.correctAnswer) {
      this.CorrectAnswer.push(this.page);
      this.totalQuestionsNumber += 10;
    } else {
      this.WrongAnswer.push(this.page);
    }
    this.verifyAnswer = new QuestionsData;
    this.isResult = true;
    this.isTimePeriod = false;
    clearInterval(this.interval);
  }


  skip() {
    console.log("skip");
     this.SkipAnswer.push(this.page);
    this.page = this.page + 1;
  
   if (this.page === this.totalQuestions) {
   this.pagination(this.page);
     this.isNextQuestion = false;
    } else {
    this.pagination(this.page);
   }
   clearInterval(this.interval);
    this.startTimer();
  }

  skipSubmit() {
    this.isResult = true;
    this.isTimePeriod = false;
    this.SkipAnswer.push(this.page);
    clearInterval(this.interval);
  }


}
