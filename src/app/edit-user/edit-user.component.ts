import { Component, OnInit, Input } from '@angular/core';


import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * constructor
   * @param fetchApiData 
   * @param router 
   * @param dialogRef 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public dialog: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  /**
   * edits user information
   */

  editUser(): void {
    this.fetchApiData.editUserInfo(this.userData).subscribe((res) => {
      this.dialog.close();
      this.dialogRef.close();
      localStorage.setItem('username', this.userData.Username);
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
}