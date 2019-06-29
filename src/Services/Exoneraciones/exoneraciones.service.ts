import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbExoneraciones } from 'src/Models/Exoneraciones';

@Injectable({
  providedIn: 'root'
})
export class ExoneracionesService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }

  ConsultarTodos(){
    return this.http.get<TbExoneraciones[]>(this.serviceGeneric.getURL()+"/exoneraciones")
  }

  ConsultarById(id){
    return this.http.get<TbExoneraciones>(this.serviceGeneric.getURL()+"/exoneraciones/"+id)
  }

  Agregar(body:TbExoneraciones){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL()+'/exoneraciones/',body,{headers})
  }

  Modificar(body:TbExoneraciones){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>(this.serviceGeneric.getURL()+'/exoneraciones/',body,{headers})
  }
  
  Eliminar(id){
    return this.http.delete<boolean>(this.serviceGeneric.getURL()+"/exoneraciones/"+id)
  }
}
