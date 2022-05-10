import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface customerForm{
  firstName: string,
  lastName: string,
  addressHome: string,
  dob: string,
  gender: string,
  cellPhone: string,
  homePhone: string,
  profession: string,
  income: string,
  currency: string,
  postalCode: string,
}

@Component({
  selector: 'app-success-form',
  templateUrl: './success-form.component.html',
  styleUrls: ['./success-form.component.scss']
})
export class SuccessFormComponent implements OnInit {

  public formi!:customerForm;

  constructor(public dialogRef: MatDialogRef<SuccessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      form: customerForm
    },) { 
      this.formi=data.form;
    }

  ngOnInit(): void {
    console.log(this.data)
  }

  close() {
    this.dialogRef.close();
  }

}
