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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ListaCliComponent } from './Clientes/lista-cli/lista-cli.component';
import { RegistroCliComponent } from './Clientes/registro-cli/registro-cli.component';
import { DetalleCliComponent } from './Clientes/detalle-cli/detalle-cli.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';

import { LoginComponent } from './usuario/login/login.component';
import { RegistroComponent } from './usuario/registro/registro.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { ModificarCliComponent } from './Clientes/modificar-cli/modificar-cli.component';
import {MomentModule} from 'ngx-moment';
import { IndexTipoMedidaComponent } from './TipoMedida/index-tipo-medida/index-tipo-medida.component';
import { DetalleTipoMedidaComponent } from './TipoMedida/detalle-tipo-medida/detalle-tipo-medida.component';
import { TipoMedidaComponent } from './TipoMedida/tipo-medida/tipo-medida.component';
import { ValidacionHaciendaComponent } from './Hacienda/validacion-hacienda/validacion-hacienda.component';

//Producto
import { ProductosComponent } from './Productos/productos.component';
import { CrearProductoComponent } from './Productos/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './Productos/modificar-producto/modificar-producto.component';
import { DetallesProductoComponent } from './Productos/detalles-producto/detalles-producto.component';
import { EliminarProductoComponent } from './Productos/eliminar-producto/eliminar-producto.component';
import { CajasComponent } from './cajas/cajas.component';
import { ComprasListComponent } from './Compras/compras-list/compras-list.component';
import { ComprasRegistroComponent } from './Compras/compras-registro/compras-registro.component';
import { ComprasDetallesComponent } from './Compras/compras-detalles/compras-detalles.component';
import { ListaExoComponent } from './Exoneraciones/lista-exo/lista-exo.component';
import { TipoExoneracionComponent } from './Exoneraciones/tipo-exoneracion/tipo-exoneracion.component';
import { AgregarExoComponent } from './Exoneraciones/agregar-exo/agregar-exo.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { DetalleExoComponent } from './Exoneraciones/detalle-exo/detalle-exo.component';


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
    SucursalComponent,
    IndexCategoriaProductoComponent,
    DetalleCategoriaProductoComponent,
    CrearCategoriaProductoComponent,

    ListaCliComponent,
    RegistroCliComponent,
    DetalleCliComponent,
    ModificarCliComponent,
    ImpuestosComponent, 
    LoginComponent,
    RegistroComponent,
    UsuarioComponent,
    IndexTipoMedidaComponent,
    DetalleTipoMedidaComponent,
    TipoMedidaComponent,
    ValidacionHaciendaComponent ,

    ProductosComponent,
    CrearProductoComponent,
    ModificarProductoComponent,
    DetallesProductoComponent,
    EliminarProductoComponent,
    CajasComponent,
    ComprasListComponent,
    ComprasRegistroComponent,
    ComprasDetallesComponent,
    ListaExoComponent,
    TipoExoneracionComponent,
    AgregarExoComponent,
    DetalleExoComponent
  ],
  imports: [
    BrowserModule,
    MomentModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() ,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MomentModule    
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
