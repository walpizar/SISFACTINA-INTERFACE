import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';

//implementado 
import { Router} from '@angular/router';
import { TbProducto } from '../../Models/Producto';
import { TbCategoriaProducto } from '../../Models/CategoriaProducto'; 
import {TbProveedores } from '../../Models/Proveedores';
import { TbImpuestos} from '../../Models/Impuesto';
import { TbTipoMedidas} from '../../Models/TipoMedidas';
import { TbTipoId } from '../../Models/TipoId';
import { TbInventario } from '../../Models/Inventario';




@Injectable({
  providedIn: 'root'
})

export class ProducserviceService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric , private router: Router) {
    
   }

//cambiar nombre de get() por cargarProductos()
   get(){
    return this.http.get<TbProducto[]>(this.serviceGeneric.getURL()+"/producto");
   }
   getProductoById(id:number){
    return this.http.get<TbProducto>(this.serviceGeneric.getURL()+"/producto/"+id);
   }

   //implementado

 public producto: TbProducto;

 ProductoActual = new TbProducto();
 productos: TbProducto[];
 categorias: TbCategoriaProducto[];
 proveedores: TbProveedores[];
 impuestos: TbImpuestos[];
 medidas: TbTipoMedidas[];
 tipoId: TbTipoId[];

 public elimino : boolean;

 cargarProductos(){
   this.http.get('http://localhost:63630/api/producto').toPromise()
   .then(res => this.productos = res as  TbProducto[]);
 }

 cargarCategorias(){
   this.http.get('http://localhost:63630/api/categoriaproducto').toPromise()
   .then(res => this.categorias = res as TbCategoriaProducto[]);
 }

 cargarProveedores(){
   this.http.get('http://localhost:63630/api/proveedor').toPromise()
   .then(res => this.proveedores = res as TbProveedores[]);
 }

 cargarMedidas(){
   this.http.get('http://localhost:63630/api/tipomedida').toPromise()
   .then(res => this.medidas = res as TbTipoMedidas[]);
 }

 cargarImpuestos(){
   this.http.get('http://localhost:63630/api/impuestos').toPromise()
   .then(res => this.impuestos = res as TbImpuestos[]);

 }

 cargarTipoId(){
   this.http.get('http://localhost:63630/api/tipoid').toPromise()
   .then(res => this.tipoId = res as TbTipoId[]);
 }

 guardar(producto:TbProducto) {

   return this.http.post('http://localhost:63630/api/producto',producto);
 }

 modificar(producto:TbProducto) {
   return this.http.put('http://localhost:63630/api/producto', producto);
 }

 eliminar(pro:TbProducto){
   return this.http.delete('http://localhost:63630/api/producto/'+pro.IdProducto);
 }  

exento(EsExento:boolean){

   var x = EsExento;
   if(x == false){
       return true;
   } else {
     return false;
   }
 }

}
