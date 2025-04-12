import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchResultsComponent } from './pages/search-results.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },






















  { path: '**', redirectTo: '' },

    
];
