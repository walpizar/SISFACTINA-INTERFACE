import { Component, OnInit } from '@angular/core';
import { TbPersona } from 'src/Models/Personas';
import { TbProveedores } from 'src/Models/Proveedores';

import { DataProvinciaService } from 'src/Services/Provincia/provincia.service';
import { DataCantonService } from 'src/Services/Canton/canton.service';
import { DataDistritoService } from 'src/Services/Distrito/distrito.service';

import { DataTipoIdService } from 'src/Services/TipoId/tipo-id.service';
import { DataBarriosService } from 'src/Services/Barrios/barrios.service';
import { DataProveedorService } from 'src/Services/Proveedor/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { PersonaTribunalService } from 'src/Services/PersonaTribunal/persona-tribunal.service';
import { TbPersonasTribunalS } from 'src/Models/PersonaTribunal';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(private provinciaService:DataProvinciaService,private cantonService:DataCantonService,
   private distritoService:DataDistritoService,private barrioService:DataBarriosService,
   private tipoidService:DataTipoIdService,private proveedorService:DataProveedorService,
   private msj:ToastrService,private servicePer:PersonaTribunalService) { }

   //Listas
  listaTipoId= new Array();
  listaProvincia=new Array();
  listaCanton=new Array();
  listaDistrito=new Array();
  listaBarrio=new Array();
  //Combos
  listaCantonCombo=new Array();
  listaDistritoCombo=new Array();
  listaBarrioCombo=new Array();
  //Variables
  Provincia:string;
  Canton:string;
  Distrito:string;
  Proveedor=new TbProveedores();
  Modificar:boolean;
  BotonCrear:boolean=true;
  BotonModificar:boolean=false;
  EsconderDatosPersonales:boolean=true;
  readonly:boolean=false;
  disabled:boolean=false;
  TextoPrincipal:boolean=true;
  PersonaTri = new TbPersonasTribunalS();
  validaDatos:boolean=true;

  ngOnInit() {
    
    this.Proveedor.TbPersona=new TbPersona();
    this.Modificar=this.proveedorService.Modify;    
    this.ConsultarProvincias();
    this.ConsultarCantones();
    this.ConsultarDistritos();
    this.ConsultarBarrios();
    this.ConsultarTipoId();
    if (this.Modificar) {
      this.readonly=true;
      this.disabled=true;
      this.TextoPrincipal=false;
      this.Proveedor=this.proveedorService.Proveedor;
      this.BotonCrear=false;
      this.BotonModificar=true;
      this.Proveedor.TbPersona.Canton.trim();
  
     this.listaDistritoCombo=this.listaDistritoCombo;
     this.listaBarrioCombo=this.listaBarrio;
    
    }
  }
  ConsultarTipoId() {
    this.tipoidService.getTipoId().subscribe(data=>{
      this.listaTipoId=data;
    })
  }
  ConsultarBarrios() {
    this.barrioService.ConsultarTodos().subscribe(data=>{
      this.listaBarrio=data;
    })
  }
  ConsultarDistritos() {
    this.distritoService.ConsultarTodos().subscribe(data=>{
      this.listaDistrito=data;
    })
  }
  ConsultarCantones() {
    this.cantonService.ConsultarTodos().subscribe(data=>{
      this.listaCanton=data;     
     
    })
  }
  ConsultarProvincias() {
    this.provinciaService.consultarTodos().subscribe(data=>{
      this.listaProvincia=data;
    })
  }
  onChangeProv(codId){
   
      this.listaDistritoCombo=new Array();
    this.listaBarrioCombo=new Array();
    this.Provincia=codId;
    this.ActivaCanton(codId); 
    
  }
  onChangeCanton(CodCant){
    this.listaDistritoCombo=new Array();
    this.listaBarrioCombo=new Array();
    this.Canton=CodCant;
    this.ActivarDistrito(CodCant);
  }
  onChangeDistrito(codDistrit){
    this.listaBarrioCombo=new Array();
    this.Distrito=codDistrit;
    this.ActivaBarrio(codDistrit)
    
  }
 
  ActivaBarrio(codigodis) {
    for (const iterator of this.listaBarrio) {
      if (iterator.Provincia==this.Provincia && iterator.Canton==this.Canton && iterator.Distrito==codigodis) {
        this.listaBarrioCombo.push(iterator);
      } else {
        
      }
    }
  }
  ActivarDistrito(codigoCant:string){
    this.listaDistritoCombo=new Array();
   
    for (const iterator of this.listaDistrito) {
      if (iterator.Canton==codigoCant && iterator.Provincia==this.Provincia) {
        this.listaDistritoCombo.push(iterator);
      } else {
        
      }
    }
    
  }
  
  ActivaCanton(codigo:string){
    try {
      this.listaCantonCombo=new Array();
      for (const iterator of this.listaCanton) {
        if (iterator.Provincia==codigo) {
          this.listaCantonCombo.push(iterator);
          
        }
      }
    } catch (error) {
      
    }
    

      
  }
  CrearProveedor(prove:TbProveedores){
    
    try {
      this.validaDatos=this.ValidacionDeDatos(prove);
      console.log(this.validaDatos)
      if (this.validaDatos) {

        this.msj.info("Estamos agregando los datos,aguarda unos instantes");
        this.proveedorService.Agregar(prove).subscribe(
          data=>{this.msj.success("Proveedor agregado correctamente")
          this.Proveedor=new TbProveedores();
          this.Proveedor.TbPersona=new TbPersona();
        },
          error=>{this.msj.error("ERROR:NO SE LOGRO REGISTAR EL PROVEEDOR")}        
          );
          
      
      
      } else {
        this.msj.warning("Verifique los datos")
      }
    } catch (error) {
      this.msj.error("Ocurrio un error en el Servicio");
    }
      
    
  }
  ValidacionDeDatos(prove: TbProveedores): boolean {
    
    let regexpEmail = 
  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    
    if ( prove.TbPersona.Identificacion == null)
    {
      this.msj.error("Debe indicar un id");
      
        return false;
    }else if(prove.TbPersona.TipoId==0)
    {
      this.msj.error("Debe indicar un tipo id");
        return false;
    }
    else if (prove.TbPersona.CodigoPaisTel == null )
    {
      this.msj.error("Debe indicar un Codigo pais tel");
        return false;
        
    }
    else if (prove.TbPersona.Telefono == 0)
    {
      this.msj.error("Debe indicar un numero de telefono");
        return false;
    }else if (prove.TbPersona.CorreoElectronico!=null)
    {
        if (regexpEmail.test(prove.TbPersona.CorreoElectronico.trim()))
        {
            if ( regexpEmail.test(prove.CorreoElectConta.trim()))
            {
                return true;
            }
            else
            {
              this.msj.error("Formato de correo no valido en Detalles de proveedor");

                return false;
            }
        }
        else
        {
          
          this.msj.error("Formato de correo no valido en Datos de proveedor");
            return false;
        }
    }else if(prove.TbPersona.CorreoElectronico==null || prove.CorreoElectConta==null){
      this.msj.error("Debe indicar el email en Dato de proveedor y el de contabilidad")
      return false;
    }    
    else if (prove.ContactoProveedor== null)
    {
      this.msj.error("Debe indicar un Contacto Proveedor");
        return false;
    }    
    else 
    {
      
        return true;
    }
  }
  ModificarProveedor(pro:TbProveedores){
    try {
        
      this.msj.warning("Realizando la modificacion,espera un momento");
      this.proveedorService.Modificar(pro).subscribe(
        data=>{this.msj.success("Proveedor modificado correctamente")
        this.BotonCrear=true;
        this.BotonModificar=false;
        this.readonly=false;
        this.disabled=false;
        this.Proveedor=new TbProveedores();
        this.Proveedor.TbPersona= new TbPersona();
        this.proveedorService.Modify=false;        
        this.TextoPrincipal=true;
      },
        erro=>{this.msj.error("ERROR:NO SE LOGRO MODIFICAR EL PROVEEDOR")})
        
    } catch (error) {
      
    }
   

  }
  Cancelar(){
    try {
      this.BotonCrear=true;
      this.BotonModificar=false;
      this.readonly=false;
      this.disabled=false;
      this.Proveedor=new TbProveedores();
      this.Proveedor.TbPersona= new TbPersona();
      this.proveedorService.Modify=false;
      this.TextoPrincipal=true;
    } catch (error) {
      
    }
    
  }
 
  Buscar(Id: string) {
    this.servicePer.ConsultarById(Id).subscribe(data => {
      this.PersonaTri = data;

      this.Proveedor.TbPersona.Nombre = this.PersonaTri.Nombre;
      this.Proveedor.TbPersona.Apellido1 = this.PersonaTri.Apellido1;
      this.Proveedor.TbPersona.Apellido2 = this.PersonaTri.Apellido2;
      if (this.PersonaTri.Sexo == 'Femenino') {
        this.Proveedor.TbPersona.Sexo = 2;
      } else {
        this.Proveedor.TbPersona.Sexo = 1;
      }

    });
  }

}
