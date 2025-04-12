import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId!: string;
  movie!: Movie;
  releaseYear: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(this.movieId).subscribe(data => {
    this.movie = data;

    if (this.movie?.Released) {
      const parts = this.movie.Released.split(' ');
      this.releaseYear = parts.length === 3 ? parts[2] : '';
    }

    });

   
    
  }
}
