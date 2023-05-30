import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.userService.getAccessToken();
    if (accessToken && accessToken.length > 0) {
      request = request.clone({
        headers: new HttpHeaders({
          "authorization": `Bearer ${accessToken}`
        })
      });
    }

    return next.handle(request);
  }

}
