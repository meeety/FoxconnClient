import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { IDataPostDto } from '../../../shared/models/data/idata-post.dto';
import { DataSandbox } from '../../../shared/sandboxes/data.sandbox';
import { RESULT_OK } from '../../../shared/models/consts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './add-data-dialog.ts.component.html',
  styleUrls: ['./add-data-dialog.ts.component.scss']
})
export class AddDataDialog implements OnInit {
  public readonly formGroup: FormGroup;
  constructor(
    private readonly _dialogRef: MatDialogRef<AddDataDialog>,
    private readonly _formBuilder: FormBuilder,
    private readonly _dataSandbox: DataSandbox,
    private readonly _snackBar: MatSnackBar,
  ) {
    this.formGroup = this._formBuilder.group({
      dataName: [null, [Validators.required]],
      dataValue: [null]
    });
  }

  ngOnInit(): void {
  }

  addData() {
    const data = {
      name: this.formGroup.get('dataName')?.value,
      value: this.formGroup.get('dataValue')?.value,
    } as IDataPostDto;
    this._dataSandbox.addData(data).pipe(
      tap(result => {
        if (result.result.toLowerCase() === RESULT_OK) {
          this._dialogRef.close(true);
        } else {
          this._snackBar.open('Add data failed, try again later', undefined, { duration: 2000 });
        }
      })
    ).subscribe();
  }
}
