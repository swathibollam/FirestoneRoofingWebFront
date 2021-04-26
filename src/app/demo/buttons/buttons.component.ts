import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <p>
      buttons works!
    </p>
    <button mat-button>
      <mat-icon>face</mat-icon>
      Demo button2
    </button>
  `,
  styles: []
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('hello demo module2')
  }

}
