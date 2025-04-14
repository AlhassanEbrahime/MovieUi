// src/app/services/movie.service.ts (Updated)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Movie, SearchResponse, MoviePageResponse, MovieRequest } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  headers: any;
  private baseUrl = 'http://localhost:8080/api/v1/movies';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      this.headers = new HttpHeaders();
    }
  }

  getMovies(page: number): Observable<MoviePageResponse> {
    return this.http.get<MoviePageResponse>(`${this.baseUrl}/${page}/all`, { headers: this.headers });
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  searchMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      return of([]);
    }
    
    return this.http.get<SearchResponse>(`${this.baseUrl}/search?query=${query}`)
      .pipe(
        map(response => {
          if (response.Response === 'True') {
            return response.Search;
          }
          return [];
        })
      );
  }

  searchOmdbMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      return of([]);
    }
    
    return this.http.get<Movie[]>(`${this.baseUrl}/search?query=${query}`, { headers: this.headers });
  }

  getOmdbMovieDetails(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/omdb/${imdbId}`, { headers: this.headers });
  }

  addMovie(movie: MovieRequest): Observable<MovieRequest> {
    return this.http.post<MovieRequest>(this.baseUrl, movie, { headers: this.headers });
  }

  addMovies(movies: Movie[]): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${this.baseUrl}/batch-add`, movies, { headers: this.headers });
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  deleteMovies(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/batch-delete`, ids, { headers: this.headers });
  }

  updateAuthHeaders() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      this.headers = new HttpHeaders();
    }
  }
}