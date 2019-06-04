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
  {path:'impuestos', component:ImpuestosComponent }

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
