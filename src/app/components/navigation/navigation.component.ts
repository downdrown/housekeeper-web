import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '@service/authentication.service';
import { UserService } from '@service/user.service';
import { User } from '@app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: User | undefined;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private authenticationService: AuthenticationService,
              private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    const token = this.authenticationService.getToken();
    this.userService.readUser(token.username).then(user => this.user = user);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }
}
