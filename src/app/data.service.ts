import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api'

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb(){

    let  currentDB =  [
      {  id:  1,  name:  'First', number: 123 },
      {  id:  2,  name:  'Second', number: 234 },
      {  id:  3,  name:  'Third', number: 345 },
      {  id:  4,  name:  'Fourth', number: 456 },
      {  id:  5,  name:  'Fifth', number: 567 },
      {  id:  6,  name:  'Sixth', number: 678 },
      {  id:  7,  name:  'Seventh', number: 789 }
     
    ];

    return {currentDB};

  } 
}
