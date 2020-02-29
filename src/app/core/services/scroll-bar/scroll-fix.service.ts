import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollFixService {


  node;
  previousScrollHeightMinusTop: number;
  readyFor: string;
  toReset: boolean = false;

  constructor() { }

  init(node : any): void {
    this.node = node;
    this.previousScrollHeightMinusTop = 0;
    this.readyFor = 'up';
  }

  restore(): void {
    if (this.toReset) {
      if (this.readyFor === 'up') {
        this.node.scrollTop = this.node.scrollHeight - this.previousScrollHeightMinusTop;
      }
      this.toReset = false;
    }
  }

  prepareFor(direction: string): void {
    this.toReset = true;
    this.readyFor = direction || 'up'
    this.previousScrollHeightMinusTop = this.node.scrollHeight - this.node.scrollTop
  }

}
