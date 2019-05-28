import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class ServiceGeneric {
  
    constructor() { }
  
    getURL(){
      return "http://localhost:63630/api";
     }
  }