import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

//declares global constants
const apiUrl = 'https://itshorrortime.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

//allows us to view the dialog
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  //injects httpclient to constructor parameters
  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Register account
   * @param userDetails 
   * @returns success/error message
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in to account
   * @param userDetails 
   * @returns success/error message
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @returns array of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('in get All Movies');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Gets movie using ID
   * @returns movie information
   */

  getMoviebyId(): Observable<any> {
    return this.http.get(apiUrl + 'movies/id/:movieId:', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets movie genre
   * @returns movie genre information
   */
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets director of movie
   * @returns movie director information
   */
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Gets user information
   * @param username
   * @returns user information
   */
  getUserInfo(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get list of favorite movies
   * @returns favorite movies
   */
  getFavorites(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/favoritemovies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds movie to favorites
   * @param id 
   * @returns status message
   */
  addToFavorites(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post(apiUrl + `users/${username}/movies/${id}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits user information
   * @param user 
   * @returns status message
   */
  editUserInfo(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, user,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  /*deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }*/

  /**
   * Deletes movie from favorites
   * @param id 
   * @param username 
   * @returns status message
   */
  deleteMovie(id: any, username: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
   * Checks for errors and returns message
   * @param res 
   * @returns error
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}