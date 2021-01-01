import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/components/login/login.component';
import { NavigationComponent } from '@app/components/navigation/navigation.component';
import { AuthenticationGuard } from '@app/guard/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavigationComponent, canActivate: [AuthenticationGuard], children:
    [
      // { path: 'child-a', component: ChildAComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
