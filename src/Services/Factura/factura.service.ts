import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbDocumento } from '../../Models/Documento';
import { Observable } from 'rxjs';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  
  public Doc: TbDocumento;
  list: TbDocumento[];

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) {

   }

  getInventarioById(id){
    return this.http.get<TbDocumento>(this.serviceGeneric.getURL()+"/documento"+id);
   }

  get(){
    return this.http.get<TbDocumento[]>(this.serviceGeneric.getURL()+"/documento");
  }

  getDocuments(){ 
    this.http.get(this.serviceGeneric.getURL()+"/documento").toPromise().then(res=>this.list=res as TbDocumento[]);
  }

  post(body : TbDocumento){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbDocumento> (this.serviceGeneric.getURL()+'/documento',body,{headers});
  }

  putData(body:TbDocumento){
   
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put(this.serviceGeneric.getURL()+'/documento',body,{headers})
  }
  
  ConsultarTodosAbono(id){
    
    return this.http.get<TbDocumento[]>(this.serviceGeneric.getURL()+"/documento/consultar/"+id);
  }  
  
  ConsultarPorFechas(id){
    
    return this.http.get<TbDocumento[]>(this.serviceGeneric.getURL()+"documento/consultar/ordenfecha/"+id);
  } 
   
}

