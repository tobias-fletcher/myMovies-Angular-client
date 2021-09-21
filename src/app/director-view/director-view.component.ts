import { Component, Inject, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: String,
      Bio: String,
      Birth: String
    }
  ) { }

  ngOnInit(): void {
  }



}
