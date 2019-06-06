import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';
import { ServiceGeneric } from '../ServiceGeneric';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class TipoMedidaService {

  constructor(private http:HttpClient, private serviceGeneric:ServiceGeneric) { }

  TipoMedida:TbTipoMedidas;
  Modificar:boolean=false;

  GetById(id){
    
    return this.http.get<TbTipoMedidas>(this.serviceGeneric.getURL()+"/tipomedida/"+id)
  }
  Get(){
    
    return this.http.get<TbTipoMedidas[]>(this.serviceGeneric.getURL()+"/tipomedida/")
  }
  
  Post(body:TbTipoMedidas){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL()+'/tipomedida/',body,{headers})
  }

  Put(body:TbTipoMedidas){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>(this.serviceGeneric.getURL()+'/tipomedida/',body,{headers})
  }
  Delete(body:TbTipoMedidas){
    console.log(body);    
    return this.http.delete<boolean>(this.serviceGeneric.getURL()+'/tipomedida/'+body.IdTipoMedida)
  }

  GetDatosforModify(tipomed:TbTipoMedidas){
    this.TipoMedida=tipomed;
    this.Modificar=true;
  }

  GetDatosforDetalles(tipomedi:TbTipoMedidas){
  this.TipoMedida=tipomedi;
  }

}
