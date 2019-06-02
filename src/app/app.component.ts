import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mySample = '';
  myChange = false;
  change() {
    if (this.mySample) {
      this.myChange = true;
    }
  }
}
