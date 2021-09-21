// core modules
import { Component, OnInit } from '@angular/core';

// custom components
import { FetchApiDataService } from '../fetch-api-data.service';


// material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// declare global variables
const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']

})

export class FavoriteMoviesComponent implements OnInit {
  // isLoading: false;
  user: any = {};
  favorites: any = [];
  favs: any = [];
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUsersFavs();
    this.getMovies();
    this.getInfo();
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.filterFavorites();
    })
  }

  getInfo(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUserInfo(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  getUsersFavs(): void {
    this.fetchApiData.getUserInfo(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      return this.favs;
    })
  }
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favs.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }




  /*addFavorite(id: string, title: string): void {
    console.log(id);
    this.fetchApiData.addToFavorites(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
      return this.getMovies();
    });*/

  removeFromUserFavorites(id: string): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.deleteMovie(id, user).subscribe((resp: any) => {
      setTimeout(function () {
        window.location.reload()
      }, 2000);
    });
    return this.getUsersFavs();
  }


}
