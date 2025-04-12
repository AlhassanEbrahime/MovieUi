import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { SearchComponent } from '../search/search.component'; // adjust path if needed


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(public auth: AuthService) {
    auth.userData.subscribe({
      next: () => {
        this.isLoggedIn = auth.userData.getValue() !== null;
      }
    });
  }


  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }
}
