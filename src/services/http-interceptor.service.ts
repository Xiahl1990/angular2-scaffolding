import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "angular2/http";
import {Router} from 'angular2/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

export class HttpInterceptor extends Http {

  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private _router:Router) {
    super(backend, defaultOptions)
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    return super.request(url, options).catch((res:Response) => this.handleResponseError(res));
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(options)).catch((res:Response) => this.handleResponseError(res));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(options)).catch((res:Response) => this.handleResponseError(res))
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs(options)).catch((res:Response) => this.handleResponseError(res));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs(options)).catch((res:Response) => this.handleResponseError(res));
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.patch(url, body, options).catch((res:Response) => this.handleResponseError(res));
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return super.head(url, options).catch((res:Response) => this.handleResponseError(res));
  }

  private getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', 'Basic ' + btoa('username:password'));
    return options;
  }

  private handleResponseError(res:Response) {

    console.log(res);

    if ((res.status === 401 || res.status === 403) && res.url.endsWith('resconfig/environment')) {
      this._router.navigate(['Login']);
      return Observable.empty();
    } else if (res.status === 500) {
      // do something
    } else {
      return Observable.throw(res);
    }
  }
}
