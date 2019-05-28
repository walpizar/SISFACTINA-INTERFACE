import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Abonos } from './Models/Abono';
import { Documento } from './Models/Documento';

@Injectable({
  providedIn: 'root'
})
export class DataAbonosService {
  Documen=new Documento();
  constructor(private http : HttpClient) { }

  getData(id:number){
    
    return this.http.get<Abonos[]>("http://localhost:63630/api/abonos/"+id)

  }
  consultaTodos(){
    
    return this.http.get<Abonos[]>("http://localhost:63630/api/abonos")
  }
  
  postData(body:Abonos){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<Abonos>('http://localhost:63630/api/abonos',body,{headers})
  }

  putData(body:Abonos){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<string>('http://localhost:63630/api/abonos',body,{headers})
  }

  recibeDocumento(Docu:Documento){
    this.Documen=Docu;
  }
}
