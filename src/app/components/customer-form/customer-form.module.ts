import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CustomerFormRoutingModule } from './customer-form-routing.module';
import { CustomerFormComponent } from './customer-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessFormComponent } from './success-form/success-form.component';


@NgModule({
  declarations: [CustomerFormComponent,
    SuccessFormComponent
  ],
  imports: [
    CommonModule,
    CustomerFormRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [CustomerFormComponent],
  providers: [
    CurrencyPipe
  ]
})
export class CustomerFormModule { }
