import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexAbonoComponent } from './Abonos/index-abono/index-abono.component';
import { DetallesAbonosComponent } from './Abonos/detalles-abonos/detalles-abonos.component';
import { AbonosComponent } from './Abonos/abonos/abonos.component';
import { ProveedorComponent } from './Proveedor/proveedor/proveedor.component';
import { IndexProveedorComponent } from './Proveedor/index-proveedor/index-proveedor.component';
import { DetalleProveedorComponent } from './Proveedor/detalle-proveedor/detalle-proveedor.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsDetailsComponent } from './Documents/documents-details/documents-details.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ListaEmpresaComponent } from './Empresas/lista-empresa.component';
import { IndexCategoriaProductoComponent } from './CategoriaProducto/index-categoria-producto/index-categoria-producto.component';
import { DetalleCategoriaProductoComponent } from './CategoriaProducto/detalle-categoria-producto/detalle-categoria-producto.component';
import { CrearCategoriaProductoComponent } from './CategoriaProducto/crear-categoria-producto/crear-categoria-producto.component';
import { ListaCliComponent } from './Clientes/lista-cli/lista-cli.component';
import { RegistroCliComponent } from './Clientes/registro-cli/registro-cli.component';
import { DetalleCliComponent } from './Clientes/detalle-cli/detalle-cli.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { ModificarCliComponent } from './Clientes/modificar-cli/modificar-cli.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistroComponent } from './usuario/registro/registro.component';
import { LoginComponent } from './usuario/login/login.component';
import { AuthGuard } from './usuario/auth/auth.guard';
import { AppComponent } from './app.component';
import { IndexTipoMedidaComponent } from './TipoMedida/index-tipo-medida/index-tipo-medida.component';
import { DetalleTipoMedidaComponent } from './TipoMedida/detalle-tipo-medida/detalle-tipo-medida.component';
import { TipoMedidaComponent } from './TipoMedida/tipo-medida/tipo-medida.component';
import { ValidacionHaciendaComponent } from './Hacienda/validacion-hacienda/validacion-hacienda.component';

//Productos
import { ProductosComponent } from './Productos/productos.component';
import { CrearProductoComponent } from './Productos/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './Productos/modificar-producto/modificar-producto.component'
import { EliminarProductoComponent } from './Productos/eliminar-producto/eliminar-producto.component';
import { ComprasListComponent } from './Compras/compras-list/compras-list.component';
import { ComprasRegistroComponent } from './Compras/compras-registro/compras-registro.component';
import { ListaExoComponent } from './Exoneraciones/lista-exo/lista-exo.component';
const routes: Routes = [
  
  {path:'Indexabono',component:IndexAbonoComponent},
  {path:'detalle', component:DetallesAbonosComponent },
  {path:'abo',component: AbonosComponent},
  {path:'proveedor',component:ProveedorComponent},
  {path:'Indexproveedor',component:IndexProveedorComponent},
  {path:'detalleproveedor',component:DetalleProveedorComponent},
  {path:"factura", component : DocumentsComponent},
  {path:'detalleFactura/:id', component : DocumentsDetailsComponent},
  {path:'empresa',component:ListaEmpresaComponent},
  {path:'Indexcategoriaproduct',component:IndexCategoriaProductoComponent},
  {path:'detailscateproduct',component:DetalleCategoriaProductoComponent},
  {path:'createcateproduct',component:CrearCategoriaProductoComponent},
  {path: 'ListaClientes', component: ListaCliComponent },
  {path: 'RegistroCliente', component: RegistroCliComponent },
  {path: 'DetallesCliente/:id', component: DetalleCliComponent },
  {path: 'ModificarCliente/:id', component: ModificarCliComponent },
  {path: 'ListaCompras', component: ComprasListComponent },
  {path: 'RegistroCompras', component: ComprasRegistroComponent },
  {path:'', redirectTo:'/usuario/login', pathMatch:"full" },
  {path:'impuestos', component:ImpuestosComponent },
  {path: 'ModificarCliente/:id', component: ModificarCliComponent },
  {path: 'tipoExoneraciones', component: ListaExoComponent },
  {
    path : 'usuario', component : UsuarioComponent, 
    children:[
      {path : 'registro', component : RegistroComponent},
      {path : 'login', component : LoginComponent}
    ]  },
  {path:'inicio', component:AppComponent,canActivate:[AuthGuard]},
  {path:'IndexTipoMedida',component:IndexTipoMedidaComponent},
  {path:'DetalleTipoMedida',component:DetalleTipoMedidaComponent},
  {path:'tipomedida',component:TipoMedidaComponent},
  {path:'validaHacienda',component:ValidacionHaciendaComponent},
    //Productos
    {path : 'Productos', component : ProductosComponent },
    {path : 'Crear_Producto', component : CrearProductoComponent},
    {path : 'Modificar_Producto', component : ModificarProductoComponent},
    {path : 'Eliminar_Producto', component : EliminarProductoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
