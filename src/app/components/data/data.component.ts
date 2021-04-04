import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { IDataDto } from 'src/app/shared/models/data/idata.dto';
import { DataSandbox } from 'src/app/shared/sandboxes/data.sandbox';
import { AddDataDialog } from '../dialogs/add-data-dialog.ts/add-data-dialog.ts.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'value', 'delete'];
  dataSource: IDataDto[] = [];
  loading = false;
  constructor(
    private readonly _dataSandbox: DataSandbox,
    private readonly _dialog: MatDialog
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  addData() {
    const dialogRef = this._dialog.open(AddDataDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  deleteData(id: string) {
    this._dataSandbox.deleteData(id).pipe(
      tap(result => {
        if (result) {
          this.getData();
        }
      })
    ).subscribe();
  }

  private getData() {
    this.loading = true;
    console.log('loading: start');
     this._dataSandbox.getData().pipe(
      delay(300),
      tap(result => {
        this.loading = false;
        this.dataSource = result;
      })
    ).subscribe();
  }
}
