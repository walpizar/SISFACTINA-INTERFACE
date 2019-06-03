import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbClientes } from '../../Models/Cliente';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbProvincia } from 'src/Models/Provincia';
import { TbCanton } from 'src/Models/Canton';
import { TbDistrito } from 'src/Models/Distrito';
import { TbBarrios } from 'src/Models/Barrios';
import { TbTipoId } from 'src/Models/TipoId';

@Injectable({
  providedIn: 'root'
})
export class DataClienteService {

  constructor(private http:HttpClient,private servicioGeneric: ServiceGeneric ) { }

  consultarCliente(idCli:string,idTipo:number) {
    return this.http.get<TbClientes>(this.servicioGeneric.getURL()+'/facturador/cliente/'+idCli+'/'+idTipo);
  }

  public detalleCli: TbClientes;

  // obtener clientes
  getClientes() {
    return this.http.get<TbClientes[]>('http://localhost:63630/api/cliente');
  }
  // obtener Provincias
  getProvincias(id?: number) {
    return this.http.get<TbProvincia[]>('http://localhost:63630/api/provincia');
  }
  // obtener cantones
  getCantones() {
    return this.http.get<TbCanton[]>('http://localhost:63630/api/canton');
  }
  // obtener distritos
  getDistritos(id?: number) {
    return this.http.get<TbDistrito[]>('http://localhost:63630/api/distrito');
  }
  // obtener barrios
  getBarrios() {
    return this.http.get<TbBarrios[]>('http://localhost:63630/api/barrio');
  }
  // obtener tipo ID
  getTiposId() {
    return this.http.get<TbTipoId[]>('http://localhost:63630/api/tipoid');
  }

  getIdExoneracion(){
    return this.http.get<TbTipoId[]>('http://localhost:63630/api/exo');
  }

  postCliente(Cliente: TbClientes) {
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbClientes>('http://localhost:63630/api/cliente',Cliente,{headers});
  }

  deleteCliente(Cli: TbClientes) {
    return this.http.delete(this.servicioGeneric.getURL() + "/cliente/" + Cli.Id + "/" + Cli.TipoId);
  }

  putCliente(Cli: TbClientes) {
    Cli.Id.trim();
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>('http://localhost:63630/api/cliente',Cli,{headers});
  }

}
