import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  externalHtml!: string | SafeHtml;

  headers = new HttpHeaders()
    .set('content-type', 'text')
    .set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true');

  options = {
    headers: this.headers,
    responseType:'text' as const,
  }
  // options: configure request
  // headers?: HttpHeaders | {[header: string]: string | string[]},
  // observe?: 'body' | 'events' | 'response',
  // params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
  // reportProgress?: boolean,
  // responseType?: 'arraybuffer'|'blob'|'json'|'text',
  // withCredentials?: boolean,

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.get('https://ines-fritsch.developerakademie.net/assets/imprint.html', this.options)
      .subscribe( (res)=> {
        this.externalHtml = this.sanitizer.bypassSecurityTrustHtml(res)
      });
  }

}
