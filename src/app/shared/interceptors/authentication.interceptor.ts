import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private _tokenService: TokenService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;

        // if (!request.headers.has('token')) {
        //     const token = this._tokenService.getToken();

        //     if (token) {
        //         request = req.clone({
        //             setHeaders: { token }
        //         });
        //     }
        // }

        return next.handle(request);
    }
}