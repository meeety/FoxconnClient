import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { IDataDto } from "../models/data/idata.dto";
import { IDataResultDto } from "../models/data/idata-result.dto";
import { IDataPostDto } from "../models/data/idata-post.dto";

@Injectable()
export class DataSandbox {
  constructor(
    private _dataService: DataService,
    private _tokenService: TokenService
  ) { }

  public getData(): Observable<IDataDto[]> {
    return this._dataService.getData(this._tokenService.getToken()).pipe(
      first()
    );
  }

  public addData(data: IDataPostDto) : Observable<IDataResultDto> {
    return this._dataService.addData(this._tokenService.getToken(), data).pipe(
      first()
    )
  }

  public deleteData(id: string) : Observable<IDataResultDto> {
    return this._dataService.deleteData(this._tokenService.getToken(), id).pipe(
      first()
    )
  }
}
