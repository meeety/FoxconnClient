import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataDialog.TsComponent } from './add-data-dialog.ts.component';

describe('AddDataDialog.TsComponent', () => {
  let component: AddDataDialog.TsComponent;
  let fixture: ComponentFixture<AddDataDialog.TsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataDialog.TsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataDialog.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
