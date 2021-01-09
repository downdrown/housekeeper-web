import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '@service/authentication.service';
import { UserService } from '@service/user.service';
import { User } from '@app/models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-90deg)' })),
      transition('rotated => default', animate('400ms ease-in')),
      transition('default => rotated', animate('400ms ease-out'))
    ])
  ]
})
export class NavigationComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  state = 'default';

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

  toggleSidenav(): void {
    this.sidenav?.toggle();
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
