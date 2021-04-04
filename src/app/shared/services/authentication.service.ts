import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, of } from "rxjs";
import { IAuthenticationResultDto } from "../models/authentication/iauthentication-result.dto";

@Injectable()
export class AuthenticationService {
    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string
    ) { }

    public loginUser(login: string, password: string) : Observable<IAuthenticationResultDto> {
        const url = `${this._baseUrl}/user/login/`;
        const data = { login , password };
        return this._httpClient.post<IAuthenticationResultDto>(url, JSON.stringify(data));
    }
}
