import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexAbonoComponent } from './Abonos/index-abono/index-abono.component';
import { DetallesAbonosComponent } from './Abonos/detalles-abonos/detalles-abonos.component';
import { AbonosComponent } from './Abonos/abonos/abonos.component';
import { ProveedorComponent } from './Proveedor/proveedor/proveedor.component';
import { IndexProveedorComponent } from './Proveedor/index-proveedor/index-proveedor.component';
import { DetalleProveedorComponent } from './Proveedor/detalle-proveedor/detalle-proveedor.component';

const routes: Routes = [
  {path:'Indexabono',component:IndexAbonoComponent},
  {path:'detalle', component:DetallesAbonosComponent },
  {path:'abo',component: AbonosComponent},
  {path:'proveedor',component:ProveedorComponent},
  {path:'Indexproveedor',component:IndexProveedorComponent},
  {path:'detalleproveedor',component:DetalleProveedorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
