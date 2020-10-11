import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTab = 'home';
  constructor() { }

  changeTab(activeTav) {
    this.activeTab = activeTav;
  }
}
