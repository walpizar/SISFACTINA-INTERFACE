import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
