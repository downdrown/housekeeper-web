import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/components/login/login.component';
import { HomeComponent } from '@app/components/home/home.component';
import { NavigationComponent } from '@app/components/navigation/navigation.component';
import { ProfileComponent } from '@app/components/profile/profile.component';
import { AuthenticationGuard as AuthGuard } from '@app/guard/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavigationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
       { path: '', redirectTo: 'home', pathMatch: 'full' },
       { path: 'home', component: HomeComponent },
       { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
