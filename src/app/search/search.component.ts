// search/search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(query => {
        if (query && query.trim() !== '') {
          this.router.navigate(['/search-results'], { 
            queryParams: { query: query }
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.isLoggedIn) {
      return; 
    }
    
    const query = this.searchControl.value;
    if (query && query.trim() !== '') {
      this.router.navigate(['/search-results'], { 
        queryParams: { query: query }
      });
    }
  }
}