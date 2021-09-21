import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteMoviesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUserInfo(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  openEditDialog(): void {
    this.dialog.open(EditUserComponent, {
      /*width: '500px',
      height: '500px'*/
    });
  }

  openFavoriteMovies(): void {
    this.dialog.open(FavoriteMoviesComponent, {
      panelClass: 'customDialog'
    });
  }


}
