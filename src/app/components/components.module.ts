import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@app/components/login/login.component';
import { MaterialModule } from '@app/material.module';
import { NavigationComponent } from '@app/components/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    NavigationComponent
  ],
  exports: [
    LoginComponent,
    NavigationComponent
  ]
})
export class ComponentsModule { }
