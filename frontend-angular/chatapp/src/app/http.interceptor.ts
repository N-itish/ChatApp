import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor{
    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.oktaAuth.getAccessToken();
        const changedReq = req.clone({ 
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        return next.handle(changedReq);
    }

}