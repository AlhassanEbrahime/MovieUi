import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie, MovieRequest } from '../models/movie.model';
import { switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | MovieRequest | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  isOmdbMovie: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (!id) {
          throw new Error('Movie ID is required');
        }
        
        this.isLoading = true;
        this.error = null;
        
        // Check if the source is specified in the route
        const source = params['source'] || this.route.snapshot.queryParams['source'];
        
        // If source is 'omdb' or the ID format is an IMDB ID (starts with 'tt')
        if (source === 'omdb' || (id && id.startsWith('tt'))) {
          this.isOmdbMovie = true;
          return this.movieService.getOmdbMovieDetails(id);
        } else {
          // Use local API for your own movies
          this.isOmdbMovie = false;
          return this.movieService.getMovieById(id).pipe(
            catchError(err => {
              // If local API fails, try OMDB as fallback
              console.warn('Local API failed, trying OMDB:', err);
              this.isOmdbMovie = true;
              return this.movieService.getOmdbMovieDetails(id);
            })
          );
        }
      })
    ).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.error = 'Failed to load movie details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}