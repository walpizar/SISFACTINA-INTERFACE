import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { IndexAbonoComponent } from './Abonos/index-abono/index-abono.component';
import { AbonosComponent } from './Abonos/abonos/abonos.component';
import { DetallesAbonosComponent } from './Abonos/detalles-abonos/detalles-abonos.component';
import { ProveedorComponent } from './Proveedor/proveedor/proveedor.component';
import { IndexProveedorComponent } from './Proveedor/index-proveedor/index-proveedor.component';
import { DetalleProveedorComponent } from './Proveedor/detalle-proveedor/detalle-proveedor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InventarioComponent } from './Inventario/inventario.component';
import { FacturadorComponent } from './Facturador/facturador.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsDetailsComponent } from './Documents/documents-details/documents-details.component';
import { ListaEmpresaComponent } from './Empresas/lista-empresa.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { IndexCategoriaProductoComponent } from './CategoriaProducto/index-categoria-producto/index-categoria-producto.component';
import { DetalleCategoriaProductoComponent } from './CategoriaProducto/detalle-categoria-producto/detalle-categoria-producto.component';
import { CrearCategoriaProductoComponent } from './CategoriaProducto/crear-categoria-producto/crear-categoria-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpresasComponent,
    IndexAbonoComponent,
    AbonosComponent,
    DetallesAbonosComponent,
    ProveedorComponent,
    IndexProveedorComponent,
    DetalleProveedorComponent,
    InventarioComponent,
    FacturadorComponent,
    DocumentsComponent,
    DocumentsDetailsComponent,
    ListaEmpresaComponent,
    IndexCategoriaProductoComponent,
    DetalleCategoriaProductoComponent,
    CrearCategoriaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() ,
    BrowserModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
