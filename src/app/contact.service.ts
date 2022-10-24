import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable,
  throwError,
  map
} from 'rxjs';
import {
  catchError,
  retry
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //private api = 'https://mailthis.to/alias'; // in case i want to use the mailto api: create alias on the Mailthis Email API site ?
  private endpointURL = 'https://ines-fritsch.developerakademie.net/send_mail_ng/send_mail.php';

  constructor(private http: HttpClient) {}

  // post method
  postMessage(input: any) {

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    if (input) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http.post(this.endpointURL, input, {headers})
      .pipe(
        retry(1), // // retry a failed request up to x times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('An error occured; please try again later.'));
    }


    // // create PostMessage method using the mailthis api
    // postMessageViaMailthisAPI(input: any) {
    //   return this.http.post(this.api, input, {responseType: 'text'})
    //     .pipe(
    //       map(
    //         (response: any) => {
    //           if (response) return response;
    //         },
    //         (error: any) => {
    //           return error;
    //         }
    //       )
    //     )
    // }

}
