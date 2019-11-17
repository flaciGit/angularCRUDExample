import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Model } from './model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  SERVER_URL: string = "http://localhost:4200/api/";

  constructor( private httpClient: HttpClient ) { }

  public getAll() : Observable<Model[]>{ 
    return this.httpClient.get<Model[]>(this.SERVER_URL + 'currentDB');
  }

  public getById(currentId: string){
    return this.httpClient.get<Model>(this.SERVER_URL + 'currentDB/' + currentId).pipe(
      tap(current => console.log(current.name ))
    );
  }

  public create(current: {id: number, name: string, number: number}){
    return this.httpClient.post(`${this.SERVER_URL + 'currentDB'}`, current)
  }

  public delete(currentId){
    return this.httpClient.delete(`${this.SERVER_URL + 'currentDB'}/${currentId}`)
  }

  public update(current: {id: number, name: string, number: number}) : Observable<number>{
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<Model>(this.SERVER_URL + 'currentDB/' + current.id, current, {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      map(res => res.status)
    );
  }
}
