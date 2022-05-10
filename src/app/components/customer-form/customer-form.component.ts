import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessFormComponent } from './success-form/success-form.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  genders: string[] = ['Male', 'Female'];
  @ViewChild('myForm') myForm!: NgForm;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe, private dialog: MatDialog) { }

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    addressHome: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    cellPhone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
    homePhone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
    profession: ['', [Validators.required, , Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    income: ['', [Validators.required]],
    currency: ['JMD', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s])+$/), Validators.maxLength(10)]]
  });

  ngOnInit(): void {
    this.currencyFormat();
    this.currencyChange();
  }

  onSubmit() {
    this.dialog.open(SuccessFormComponent, { data: { form: this.profileForm.value } });
    this.dialog.afterAllClosed.subscribe(() => {
      this.profileForm.reset();
      this.myForm.resetForm();
    })
  }

  currencyFormat() {
    this.profileForm.controls['income'].valueChanges.subscribe(form => {
      form ? this.profileForm.patchValue({
        income: this.currencyPipe.transform(form.replace(/\D/g, '').replace(/^0+/, ''), this.profileForm.controls['currency'].value, 'symbol-narrow', '1.0-0')
      }, { emitEvent: false }) : null
    })
  }

  currencyChange() {
    this.profileForm.controls['currency'].valueChanges.
      subscribe((form) => form ? this.profileForm.controls['income'].setValue(null) : null)
  }

  formatPhoneNumber(phoneNumber: string) {
    console.log(phoneNumber);
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  }

  changeCellPhone(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;

    this.profileForm.controls['cellPhone'].setValue(this.formatPhoneNumber(event.target.value), {
      onlySelf: true,
    });
  }

  changeHomePhone(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;

    this.profileForm.controls['homePhone'].setValue(this.formatPhoneNumber(event.target.value), {
      onlySelf: true,
    });
  }
}
