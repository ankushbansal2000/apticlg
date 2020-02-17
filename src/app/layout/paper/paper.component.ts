import { NewRegistration } from './../../models/newregistration';
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
  timeLeft: number = 120;
  interval;
  isTimePeriod: boolean = true;
  public highestScore = {} as NewRegistration;
  id: string;
  previousHighestScore: string;
  isLoader : boolean = true;

  constructor(private apiService: AuthService, public router: Router) {
    this.verifyAnswer = new QuestionsData;
  }

  ngOnInit() {
    this.pagination(this.page);
    this.totalPage();
    this.startTimer();
    this.previousHighestScore = sessionStorage.getItem('highestScore');
  }

  startTimer() {
    this.timeLeft = 120;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.page === this.totalQuestions) {
          this.isTimePeriod = false;
          this.skipSubmit();
        } else {
          this.skip();
          //    this.page = this.page + 1;
          this.timeLeft = 120;
        }
      }
    }, 1000)
  }

  totalPage() {
    this.apiService.totalPageQuestions()
      .subscribe((data: number) => {
        this.totalQuestions = data;
        console.log("total questions is " + this.totalQuestions);
        this.CheckedQuestion();
      });
  }

  pagination(page: number) {
    this.apiService.questionsPagination(page)
      .subscribe((data: QuestionsData[]) => {
        this.questionsData = data;
       this.isLoader = false;
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
    if (this.previousHighestScore < this.totalQuestionsNumber + '') {
      this.highestScore.highestScore = this.totalQuestionsNumber;
      this.submitHeighestScore(this.highestScore);
    }
    clearInterval(this.interval);
  }

  submitHeighestScore(data: NewRegistration) {
    this.id = sessionStorage.getItem('token');
    this.apiService.updateHighestScore(this.id, data).subscribe(data => {
    });
  }

  skip() {
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
    console.log("skip submit");
    this.isResult = true;
    this.isTimePeriod = false;
    this.SkipAnswer.push(this.page);
    clearInterval(this.interval);
    if (this.previousHighestScore < this.totalQuestionsNumber + '') {
      this.highestScore.highestScore = this.totalQuestionsNumber;
      this.submitHeighestScore(this.highestScore);
    }
  }


}
