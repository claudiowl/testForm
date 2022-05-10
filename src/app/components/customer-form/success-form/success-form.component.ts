import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerForm } from '../../../models/customer-form';


@Component({
  selector: 'app-success-form',
  templateUrl: './success-form.component.html',
  styleUrls: ['./success-form.component.scss']
})
export class SuccessFormComponent {

  public customerForm!:CustomerForm;

  constructor(public dialogRef: MatDialogRef<SuccessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      form: CustomerForm
    },) { 
      this.customerForm=data.form;
    }

  close() {
    this.dialogRef.close();
  }

}
