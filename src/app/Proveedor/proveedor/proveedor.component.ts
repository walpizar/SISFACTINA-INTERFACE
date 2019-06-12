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

  constructor(private provinciaService: DataProvinciaService, private cantonService: DataCantonService,
    private distritoService: DataDistritoService, private barrioService: DataBarriosService,
    private tipoidService: DataTipoIdService, private proveedorService: DataProveedorService,
    private msj: ToastrService, private servicePer: PersonaTribunalService) { }

  //Listas
  listaTipoId = new Array();
  listaProvincia = new Array();
  listaCanton = new Array();
  listaDistrito = new Array();
  listaBarrio = new Array();
  //Combos
  listaCantonCombo = new Array();
  listaDistritoCombo = new Array();
  listaBarrioCombo = new Array();
  //Variables
  Provincia: string;
  Canton: string;
  Distrito: string;
  Proveedor = new TbProveedores();
  Modificar: boolean;
  BotonCrear: boolean = true;
  BotonModificar: boolean = false;
  EsconderDatosPersonales: boolean = true;
  readonly: boolean = false;
  disabled: boolean = false;
  TextoPrincipal: boolean = true;
  PersonaTri = new TbPersonasTribunalS();
  validaDatos: boolean = true;

  ngOnInit() {

    this.Proveedor.TbPersona = new TbPersona();
    this.Modificar = this.proveedorService.Modify; //Extrae la variable que se almacena en el servicio,la cual indica si es una modificacion o no
    this.ConsultarProvincias();
    this.ConsultarCantones();
    this.ConsultarDistritos();
    this.ConsultarBarrios();
    this.ConsultarTipoId();
    if (this.Modificar) { // Si la variable fue verdadero realizara lo siguiente
      this.readonly = true; //Inhabilita el input del id
      this.disabled = true; //Inhabilita el select de tipo id
      this.TextoPrincipal = false; //Oculta el texto de crear proveedor
      this.Proveedor = this.proveedorService.Proveedor; //Extrae del servicio la entidad que se modificara
      this.BotonCrear = false; //Oculta el boton de crear
      this.BotonModificar = true; //Muestra el boton de crear  
     
    }
  }
  //Consulta los tipo de id a la BD
  ConsultarTipoId() {
    this.tipoidService.getTipoId().subscribe(data => {
      this.listaTipoId = data;
    })
  }
  //Consulta los barrios a la BD
  ConsultarBarrios() {
    this.barrioService.ConsultarTodos().subscribe(data => {
      this.listaBarrio = data;
    })
  }
  //Consulta los distritos a la BD
  ConsultarDistritos() {
    this.distritoService.ConsultarTodos().subscribe(data => {
      this.listaDistrito = data;
    })
  }
   //Consulta los cantones a la BD
  ConsultarCantones() {
    this.cantonService.ConsultarTodos().subscribe(data => {
      this.listaCanton = data;

    })
  }

   //Consulta las provincias a la BD
  ConsultarProvincias() {
    this.provinciaService.consultarTodos().subscribe(data => {
      this.listaProvincia = data;
    })
  }
  //Una vez seleccionada una provincia recibe el id de ella y lo envia al metodo de activar canton
  onChangeProv(codId) {
    this.listaDistritoCombo = new Array();
    this.listaBarrioCombo = new Array();
    this.Provincia = codId;
    this.ActivaCanton(codId);

  }
  //Una vez seleccionado un canton recibe el id de el y lo envia al metodo de activar distrito
  onChangeCanton(CodCant) {
    this.listaDistritoCombo = new Array();
    this.listaBarrioCombo = new Array();
    this.Canton = CodCant;
    this.ActivarDistrito(CodCant);
  }
  //Una vez seleccionado un distrito recibe el id de el y lo envia al metodo de activar Barrio
  onChangeDistrito(codDistrit) {
    this.listaBarrioCombo = new Array();
    this.Distrito = codDistrit;
    this.ActivaBarrio(codDistrit)

  }

  ActivaBarrio(codigodis) {
    for (const iterator of this.listaBarrio) {
      //Realiza las comparaciones necesarias para mostar los barrios de esa proncia conjunto al canton y distrito
      if (iterator.Provincia == this.Provincia && iterator.Canton == this.Canton && iterator.Distrito == codigodis) {
        this.listaBarrioCombo.push(iterator);
      } else {

      }
    }
  }
  ActivarDistrito(codigoCant: string) {
    this.listaDistritoCombo = new Array();

    for (const iterator of this.listaDistrito) {
      //Realiza las comparaciones necesarias para mostar los distritos de esa proncia conjunto al canton 
      if (iterator.Canton == codigoCant && iterator.Provincia == this.Provincia) {
        this.listaDistritoCombo.push(iterator);
      } else {

      }
    }

  }

  ActivaCanton(codigo: string) {
    try {
      this.listaCantonCombo = new Array();
      for (const iterator of this.listaCanton) {
         //Realiza las comparaciones necesarias para mostar los cantones de esa proncia 
        if (iterator.Provincia == codigo) {
          this.listaCantonCombo.push(iterator);

        }
      }
    } catch (error) {

    }



  }
  CrearProveedor(prove: TbProveedores) {   
    try {
      //Metodo para validar los espacios que no deben ir nulos a la BD
      this.validaDatos = this.ValidacionDeDatos(prove);
      
      if (this.validaDatos) {

        this.msj.info("Estamos agregando los datos,aguarda unos instantes");
        //Envia los datos a la BD
        this.proveedorService.Agregar(prove).subscribe(
          data => {
            this.msj.success("Proveedor agregado correctamente")
            this.Proveedor = new TbProveedores();
            this.Proveedor.TbPersona = new TbPersona();
          },
          error => { this.msj.error("ERROR:NO SE LOGRO REGISTAR EL PROVEEDOR") }
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
      new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'); //Expresion regular para la validacion de correo electronico
                                       //El "\" debe ir de esa forma, de lo contrario no realiza la validacion.                        

    if (prove.TbPersona.Identificacion == null) {
      this.msj.error("Debe indicar un id");
      return false;

    } else if (prove.TbPersona.TipoId == 0) {
      this.msj.error("Debe indicar un tipo id");
      return false;

    } else if (prove.TbPersona.Nombre == null) {

      this.msj.error("Debe indicar un nombre");
      return false;
    }
    else if (prove.TbPersona.CodigoPaisTel == null) {
      this.msj.error("Debe indicar un Codigo pais tel");
      return false;

    }
    else if (prove.TbPersona.Telefono == 0) {
      this.msj.error("Debe indicar un numero de telefono");
      return false;

    } else if (prove.TbPersona.CorreoElectronico != null) {
      if (regexpEmail.test(prove.TbPersona.CorreoElectronico.trim())) {
        if (prove.CorreoElectConta != null) {
          if (regexpEmail.test(prove.CorreoElectConta.trim())) {
            return true;
          }
          else {
            this.msj.error("Formato de correo no valido en Detalles de proveedor");
    
            return false;
          }
      }
      else {
        if (prove.ContactoProveedor == null) {
          this.msj.error("Debe indicar un Contacto Proveedor");
          return false;
        }
        else {
    
          return true;
      } 
      }
    } 
    else if (prove.ContactoProveedor == null) {
      this.msj.error("Debe indicar un Contacto Proveedor");
      return false;
    }
    else {

      return true;
    }
  }
  }

  ModificarProveedor(pro: TbProveedores) {
    try {

      this.msj.warning("Realizando la modificacion,espera un momento");
      //Envia los datos a modificar a la BD
      this.proveedorService.Modificar(pro).subscribe(
        data => {
          this.msj.success("Proveedor modificado correctamente")
          this.BotonCrear = true; //Muestra el boton de crear
          this.BotonModificar = false; //Oculta el boton de modificar
          this.readonly = false; //Habilita el input de id
          this.disabled = false; //Habilita el select de tipo id
          this.Proveedor = new TbProveedores(); //Nueva instancia de proveedor
          this.Proveedor.TbPersona = new TbPersona(); //Nueva instancia de persona (MUY IMPORTANTE)
          this.proveedorService.Modify = false; //Indica que ya la modificacion se realizo y su estado sera falso
          this.TextoPrincipal = true; //Muestra el texto principal
        },
        erro => { this.msj.error("ERROR:NO SE LOGRO MODIFICAR EL PROVEEDOR") })

    } catch (error) {

    }


  }
  Cancelar() {
    try {
      this.BotonCrear = true; //Muestra el boton de crear
      this.BotonModificar = false; //Oculta el boton de modificar
      this.readonly = false; //Habilita el input de id
      this.disabled = false; //Habilita el select de tipo id
      this.Proveedor = new TbProveedores(); //Nueva instancia de proveedor
      this.Proveedor.TbPersona = new TbPersona(); //Nueva instancia de persona (MUY IMPORTANTE)
      this.proveedorService.Modify = false; 
      this.TextoPrincipal = true; //Muestra el texto principal
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
