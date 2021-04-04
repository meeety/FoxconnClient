import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {
    private readonly NO_TOKEN = '';
    private _token = this.NO_TOKEN;

    public getToken() : string {
        return this._token;
    }

    public setToken(token: string) {
        this._token = token;
    }

    public clearToken() {
        this._token = this.NO_TOKEN;
    }
}