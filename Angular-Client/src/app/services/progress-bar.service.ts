import { Injectable } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressRef: NgProgressRef;
  defaultColor: String = '#1B95E0';
  successColor: String = '#42A948';
  errorColor: String = '#a94442';
  currentColor: String = this.defaultColor
  constructor() { }

  startLoading() {
    this.currentColor = this.defaultColor
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete()
  }
  setSuccess() {
    this.currentColor = this.successColor
  }
  setError() {
    this.currentColor = this.errorColor
  }
}
