import {Component} from '@angular/core';

const BASE_URL = 'http://localhost:3000/api/';

@Component({
  selector: 'kze-root',
  template: `    
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" routerLink="/items">Items</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/lists">Lists</a> 
      </li>
    </ul>
    <router-outlet></router-outlet>
  </div>`,
  styles: []
})
export class AppComponent {}

