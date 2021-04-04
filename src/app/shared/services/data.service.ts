import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { IDataDto } from "../models/data/idata.dto";
import { IDataResultDto } from "../models/data/idata-result.dto";
import { IDataPostDto } from "../models/data/idata-post.dto";

@Injectable()
export class DataService {
    constructor(
        private _httpClient: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string
    ) { }

    public getData(token: string) : Observable<IDataDto[]> {
        const url = `${this._baseUrl}/data/get/`;
        const params = { token };
        return this._httpClient.get<IDataDto[]>(url, { params });
    }

    public addData(token: string, data: IDataPostDto) : Observable<IDataResultDto> {
      const url = `${this._baseUrl}/data/create/`;
      const params = { token };
      const body = { payload: JSON.stringify(data) };
      return this._httpClient.post<IDataResultDto>(url, JSON.stringify(data), { params });
    }

    public deleteData(token: string, id: string) : Observable<IDataResultDto> {
      const url = `${this._baseUrl}/data/delete/${id}/`;
      const params = { token };
      return this._httpClient.get<IDataResultDto>(url, { params });
    }

    public getDataById(id: number, token: string) : Observable<IDataDto> {
        const url = `${this._baseUrl}/data/get/${id}/`;
        return this._httpClient.get<IDataDto>(url);
    }
}
