import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '@app/components/login/login.component';
import { MaterialModule } from '@app/material.module';
import { NavigationComponent } from '@app/components/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NavigationComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    NavigationComponent
  ]
})
export class ComponentsModule { }
