import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbAbonos } from 'src/Models/Abonos';
import { TbDocumento } from 'src/Models/Documento';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataAbonosService {
  Documen=new TbDocumento();
  constructor(private http : HttpClient,private serviceGeneric: ServiceGeneric) { }

  getData(id:number){
    
    return this.http.get<TbAbonos[]>(this.serviceGeneric.getURL()+"/abonos/"+id)

  }
  consultaTodos(){
    
    return this.http.get<TbAbonos[]>(this.serviceGeneric.getURL()+"/abonos/")
  }
  
  postData(body:TbAbonos){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL()+"/abonos/",body,{headers})
  }

  putData(body:TbAbonos){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>(this.serviceGeneric.getURL()+"/abonos/",body,{headers})
  }

  recibeDocumento(Docu:TbDocumento){
    this.Documen=Docu;
  }
}
