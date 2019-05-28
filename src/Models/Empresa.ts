import { TbPersona } from "./Personas";
import { TbDocumento } from './Documento';
import { TbUsuarios } from './Usuarios';
import { TbParametrosEmpresa } from './ParametrosEmpresa';
import { TbReporteHacienda } from './ReporteHacienda';
export class TbEmpresa{

  Id: string ;
  TipoId: number ;
  RazonSocial: string;
  CertificadoInstalado: string;
  RutaCertificado: string;
  Pin: number ;
  UsuarioApiHacienda: string ;
  ClaveApiHacienda: string;
      NumeroResolucion : number;
  FechaResolucio: Date;
 CorreoElectronicoEmpresa: string ;
 ContrasenaCorreo: string;
 NombreComercial: string ;
 CuerpoCorreo: string;
 SubjectCorreo: string;
  FechaCaducidad: Date ;
 AmbientePruebas : boolean ;
 RutaXmlcompras: string ;
  ImprimeDoc: boolean ;

  TbPersona: TbPersona;
  TbDocumento: TbDocumento[];
  TbParametrosEmpresa: TbParametrosEmpresa[];
  TbReporteHacienda: TbReporteHacienda[];
  TbUsuarios: TbUsuarios[];



    constructor(){

    
    }
    }
