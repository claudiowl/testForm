import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CustomerFormRoutingModule } from './customer-form-routing.module';
import { CustomerFormComponent } from './customer-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerFormComponent],
  imports: [
    CommonModule,
    CustomerFormRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[CustomerFormComponent],
  providers:[
    CurrencyPipe
  ]
})
export class CustomerFormModule { }
