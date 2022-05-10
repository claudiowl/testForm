import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { SuccessFormComponent } from './success-form/success-form.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {

  @ViewChild('myForm') myForm!: NgForm;
  genders: string[] = ['Male', 'Female'];
  maxDate: Date = new Date();
  subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe, private dialog: MatDialog) { }


  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    addressHome: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    cellPhone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/), Validators.maxLength(14)]],
    homePhone: ['', [Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
    profession: ['', [Validators.required, , Validators.pattern(/^(?![\s-])([a-zA-Z0-9\s\.\,\-]|[à-ú]|[À-Ú])+$/)]],
    income: ['', [Validators.required]],
    currency: ['JMD', []],
    postalCode: ['', [Validators.required, Validators.pattern(/^(?![\s-])([a-zA-Z0-9])+$/), Validators.maxLength(10)]]
  });

  ngOnInit(): void {
    this.currencyFormat();
    this.currencyChange();
  }

  onSubmit() {
    this.dialog.open(SuccessFormComponent, { data: { form: this.profileForm.value } });
    this.subs.push(
      this.dialog.afterAllClosed.subscribe(() => {
        this.myForm.resetForm({onlySelf: false, emitEvent: true});
        this.profileForm.reset({onlySelf: false, emitEvent: true});
      }))
  }

  currencyFormat() {
    this.subs.push(
      this.profileForm.controls['income'].valueChanges.subscribe(form => {
        form ? this.profileForm.patchValue({
          income: this.currencyPipe.transform(form.replace(/\D/g, '').replace(/^0+/, ''), this.profileForm.controls['currency'].value, 'symbol-narrow', '1.0-0')
        }, { emitEvent: false }) : null
      }))
  }

  currencyChange() {
    this.subs.push(
      this.profileForm.controls['currency'].valueChanges.
        subscribe((form) => form ? this.profileForm.controls['income'].setValue(null) : null))
  }

  formatPhoneNumber(phoneNumber: string) {
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let matchEnd: RegExpMatchArray | undefined | null = cleaned.match(/^(\d{3})(\d{3})(\d{1})$/);
    let matchMid: RegExpMatchArray | undefined | null = cleaned.match(/^(\d{3})(\d{1})$/);

    if (matchEnd) {
      return '(' + matchEnd[1] + ') ' + matchEnd[2] + '-' + matchEnd[3];
    }
    if (matchMid) {
      return '(' + matchMid[1] + ') ' + matchMid[2]
    }

    return phoneNumber;
  }

  changeCellPhone(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    this.profileForm.controls['cellPhone'].setValue(this.formatPhoneNumber(event.target.value), {
      onlySelf: true,
    });
  }

  changeHomePhone(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    this.profileForm.controls['homePhone'].setValue(this.formatPhoneNumber(event.target.value), {
      onlySelf: true,
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }

  clearErrors() {
    let controls = [
      "firstName",
      "lastName",
      "addressHome",
      "dob",
      "gender",
      "cellPhone",
      "homePhone",
      "profession",
      "income",
      "currency",
      "postalCode",]
    for (let iterator of controls) {
      this.profileForm.controls[iterator].setErrors(null);
      this.profileForm.controls[iterator].updateValueAndValidity();
    }
  }
}
