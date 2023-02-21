import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/services';

import { User } from '@shared/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.toastr.success('Logout successful', 'Success!');
    this.router.navigate(['/login']);
  }
}
