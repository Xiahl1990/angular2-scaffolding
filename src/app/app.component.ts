/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {AppState} from './app.service';
import {RouterActive} from './router-active';

import {Login} from './login/login.component';
import {Main} from './main/main.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('../assets/css/bootstrap.min.css'),
    require('../assets/css/custom.css'),
    `
    .header-container {
      overflow: visible;
      right: 0;
      z-index: 500;
      min-width: 900px;
      height: 44px;
      color: #fff;
      background-color: #2a2d34;
    }
    .main-container {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    min-width: 900px;
    font-size: 14px;
    }
    .footer-container{
      clear: both;
      height: 55px;
      line-height: 55px;
      margin-top: 250px;
    }
  `],
  template: `
    <header class="header-container">
      <div>这是界面头部aaaa</div>
    </header>
    <main class="main-container">
      <router-outlet></router-outlet>
    </main>
<!--    <footer>
      Copyright © 2015 NetDragon Websoft Inc. All Rights Reserved
    </footer>-->
  `
})
@RouteConfig([
  { path: '/',      name: 'Login', component: Login, useAsDefault: true },
  { path: '/main/...',  name: 'Main',  component: Main }
])
export class App {
  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
