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

  // Add a single movie
  addMovie(movie: MovieRequest): Observable<MovieRequest> {
    return this.http.post<MovieRequest>(this.baseUrl, movie, {headers: this.headers});
  }

  // Add multiple movies
  addMovies(movies: Movie[]): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${this.baseUrl}/bulk`, movies, {headers: this.headers});
  }

  // Delete a single movie by ID
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,  {headers: this.headers});
  }

  // Delete multiple movies by IDs
  deleteMovies(ids: number[]): Observable<void> {
    const options = { body: ids };
    return this.http.delete<void>(`${this.baseUrl}/bulk`, options);
  }
}
