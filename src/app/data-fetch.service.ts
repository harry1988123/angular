import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from './models/dataModel';
 
@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  
  readonly APIUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json';
  constructor(private http:HttpClient) { }

  getData():Observable<UserData[]>{
    return this.http.get<UserData[]>(this.APIUrl);
  }
}
