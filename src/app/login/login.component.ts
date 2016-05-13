import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {FormBuilder, Validators}    from 'angular2/common';
import {Router} from 'angular2/router';

import {LoginService, User} from './login.service';
import {ValidationService} from './validation.service';

@Component({
  selector: 'login',
  styles: [require('./login.css')],
  template: require('./login.html'),
  providers: [ValidationService,LoginService]
})
export class Login {
  public user = new User('', '');
  public errorMsg = '';
  public env:Object[] = [];
  loginForm:any;

  constructor(private _formBuilder:FormBuilder, private _router:Router, private http:Http, private loginService:LoginService) {
    this.loginForm = this._formBuilder.group({
      // 'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16), ValidationService.emailValidator])], //Validators.pattern('[0-9]{3,16}')
      // 'password': ['', ValidationService.passwordValidator]
      'name': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  private login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.httpGetTest();
      this.httpPostTest();
      if (!this.loginService.login(this.user)) {
        this.errorMsg = '登录失败';
      }
    }
  };

  private httpGetTest() {
    this.loginService.httpGetTest('http://fac-resouce-manage.dev.web.nd/v0.11/resconfig/environment').subscribe(
      env => this.env = env,
      error =>  this.errorMsg = <any>error);
  };

  private httpPostTest() {
    this.loginService.httpPostTest('http://fac-resouce-manage.dev.web.nd/v0.11/resconfig/environment', this.user).subscribe(
      env => this.env = env,
      error =>  this.errorMsg = <any>error);
  };
}
