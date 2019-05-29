import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { TbDocumento } from 'src/Models/Documento';
import { TbDetalleDocumento } from 'src/Models/DetalleDocumento';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit {

  MostrarDoc:TbDocumento;
  mostrar:boolean;
  mostrarbtn:boolean;
  detalleActual:TbDetalleDocumento[];
  

  constructor(private service:FacturaService,private msjAlerta:ToastrService) { 
    this.mostrar=false;
    this.mostrarbtn=true;
    this.MostrarDoc=this.service.Doc;
    this.detalleActual =this.MostrarDoc.TbDetalleDocumento;
  }

  ngOnInit() {
  }

  guardar(form:NgForm){ 

    form.value.TbDetalleDocumento = this.detalleActual;
    form.value.TipoDocumento=3;
    form.value.CodigoRef=this.MostrarDoc.Id;
    form.value.ClaveRef=this.MostrarDoc.Clave;
    form.value.IdEmpresa='603920529';
    form.value.TipoIdEmpresa=1;
    form.value.Estado=true;
    form.value.FechaRef=this.MostrarDoc.Fecha;
    form.value.Usuario_crea=this.MostrarDoc.UsuarioCrea;
    form.value.Fecha_Crea=this.MostrarDoc.FechaCrea;
    form.value.EstadoFactura=this.MostrarDoc.EstadoFactura;
    form.value.NotificarCorreo=this.MostrarDoc.NotificarCorreo;

    this.service.post(form.value).subscribe(

      res =>{this.msjAlerta.success('Registro realizado correctamente',' Nota Credito');
        this.mostrar=false;
        this.mostrarbtn=false;
      },
      err=>{this.msjAlerta.error('Error de registro',' Nota Credito')}
      );
     
      
  }
}
