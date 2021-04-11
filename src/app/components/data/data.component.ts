import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, filter, first, switchMap, tap } from 'rxjs/operators';
import { RESULT_OK } from '../../shared/models/consts';
import { IDataDto } from '../../shared/models/data/idata.dto';
import { DataSandbox } from '../../shared/sandboxes/data.sandbox';
import { AddDataDialog } from '../dialogs/add-data-dialog.ts/add-data-dialog.ts.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

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
    private readonly _dialog: MatDialog,
    private readonly _snackBar: MatSnackBar,
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
    const dialogRef = this._dialog.open(ConfirmDialogComponent, { data: { title: 'Delete data', text: `Do you really want to delete data ID ${id}?` } });

    dialogRef.afterClosed().pipe(
      first(),
      filter(result => result),
      switchMap(() => this._dataSandbox.deleteData(id).pipe(
        tap(result => {
          if (result.result.toLowerCase() === RESULT_OK) {
            this.getData();
          } else {
            this._snackBar.open('Delete data failed, try again later', undefined, { duration: 2000 });
          }
        })
      )),
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
