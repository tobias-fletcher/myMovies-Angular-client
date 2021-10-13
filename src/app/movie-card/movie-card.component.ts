import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DescriptionViewComponent } from '../description-view/description-view.component'
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FavoriteMoviesComponent } from '../favorites/favorites.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  snackBar: any;
  favs: any[] = [];
  user: any = {};
  FavoriteMovies: any = [];

  /**
   * constructs dialog, router, and fetchApiData
   * @param fetchApiData 
   * @param dialog 
   * @param router 
   */
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * gets movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * opens user profile component
   */
  openUserDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'customDialog'
    });
    /*
    const username = localStorage.getItem('user');
    console.log(user);
    this.router.navigate([`users/${user
    }`]);*/

  }

  /**
   * logs user out
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out!', 'OK', {
      duration: 3000
    });
  }

  /**
   * opens genre view dialog
   * @param Name 
   * @param Description 
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      panelClass: 'customDialog'
    });

  }

  /**
   * opens director view dialog
   * @param Name 
   * @param Bio 
   * @param Birth 
   */
  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Bio, Birth },
      panelClass: 'customDialog'
    });
  }

  /**
   * opens director dialog
   * @param title 
   * @param description 
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: { title, description },
      panelClass: 'customDialog'
    });
  }

  /**
   * oadds a movie to user favorites
   * @param id 
   * @param title 
   * @returns getUserFavorites
   */
  addToUserFavorites(id: string, title: string): void {
    console.log(id);
    this.fetchApiData.addToFavorites(id).subscribe((resp: any) => {
      return this.getUsersFavs();
    })
  }

  /**
   * gets a user favorite movies
   * @returns favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.getUserInfo(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
      return this.FavoriteMovies;
    })
  }

  /**
   * opens favorite movies dialog
   */
  getFavoriteList(): void {
    this.dialog.open(FavoriteMoviesComponent, {
    })
  }

}