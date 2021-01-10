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

  isMobile$: Observable<boolean> = this.observeBreakpoint([Breakpoints.Handset, Breakpoints.Tablet]);
  isHandset$: Observable<boolean> = this.observeBreakpoint(Breakpoints.Handset);
  isTablet$: Observable<boolean> = this.observeBreakpoint(Breakpoints.Tablet);
  isWeb$: Observable<boolean> = this.observeBreakpoint(Breakpoints.Web);

  user: User | undefined;

  constructor(private authenticationService: AuthenticationService,
              private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private router: Router) {}

  public ngOnInit(): void {
    const token = this.authenticationService.getToken();
    this.userService.readUser(token.username).then(user => this.user = user);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }

  private observeBreakpoint(breakpoint: string | string[]): Observable<boolean> {
    return this.breakpointObserver.observe(breakpoint)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
