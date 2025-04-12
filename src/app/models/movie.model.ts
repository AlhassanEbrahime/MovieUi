export interface Movie {
    id: number;
    imdbID: string;
    Year:String
    Title: string;
    Type: string;
    Plot: string;
    Released: string;
    Rated: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Writer: string;
    Language: string;
    Country: string;
    Poster: string;
    imdbRating: string;
  }

  export interface MovieRequest {
    imdbID: string;
    Year:String
    Title: string;
    Type: string;
    Plot: string;
    Released: string;
    Rated: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Writer: string;
    Language: string;
    Country: string;
    Poster: string;
    imdbRating: string;
  }
  
  export interface MoviePageResponse {
    content: Movie[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  }
  

  export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }