import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, Response} from "angular2/http"
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

export class User {
  constructor(public name:string,
              public password:string) {
  }
}

var users = [
  new User('admin', '123456'),
  new User('test', '123456')
];

@Injectable()
export class LoginService {
  url:string;

  constructor(private _router:Router, private http:Http) {
    this.url = "http://fac-resouce-manage.dev.web.nd/v0.11/resconfig/environment";
  }

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }

  login(user) {
    var authenticatedUser = users.find(u => u.name === user.name);
    if (authenticatedUser) {
      localStorage.setItem("user", authenticatedUser.toString());
      this._router.navigate(['Main']);
      return true;
    }
    return false;

  }

  checkCredentials() {
    if (localStorage.getItem("user") === null) {
      this._router.navigate(['Login']);
    }
  }

  httpGetTest(url) {
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  httpPostTest(url, data) {
    return this.http.post(url, JSON.stringify(data)).map(this.extractData).catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || body.data || {};
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || '服务器错误';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
