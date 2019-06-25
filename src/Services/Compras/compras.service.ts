import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbDocumento } from 'src/Models/Documento';
import { TbProveedores } from 'src/Models/Proveedores';
import { TbProducto } from 'src/Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  // vars
  currentPurchase: TbDocumento;

  // constructor con inyeccion de datos httpCliente y el servicio generico
  constructor(private http: HttpClient, private serviceGeneric: ServiceGeneric) { }

  // agrega una compra
  post(body: TbDocumento) {
    const headers = new HttpHeaders().set('Content-type', 'application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL() + '/proveedor/', body, { headers });
  }

  // get providers
  // obtener provedores
  getProviders() {
    return this.http.get<TbProveedores[]>(this.serviceGeneric.getURL() + '/proveedor/');
  }

  // get invoices type: 6
  // obtener facturas tipo: 6
  getInvoices() {
    return this.http.get<TbDocumento[]>(this.serviceGeneric.getURL() + '/compras');
  }

  // get Products
  // obtener Productos
  getProducts() {
    return this.http.get<TbProducto[]>(this.serviceGeneric.getURL() + '/producto');
  }


}

