import { TbEmpresa } from './Empresa';

export class TbReporteHacienda{

      Id : number;
          ConsecutivoReceptor : string;
          ClaveReceptor : string;
          ClaveDocEmisor : string;
          Fecha : Date;
          FechaEmision : Date;
          TipoIdEmisor : number;
          IdEmisor : string;
          NombreEmisor : string;
          EstadoRespHacienda : string;
          ReporteAceptaHacienda : boolean;
          MensajeReporteHacienda : string;
          MensajeRespHacienda : boolean;
          FechaCrea : Date;
          FechaUltMod : Date;
          UsuarioCrea : string;
          UsuarioUltMod : string;
          EstadoRecibido : number;
          Razon : string;
          TotalImp : number;
          TotalFactura : number;
          IdEmpresa : string;
          TipoIdEmpresa : number;
          NombreArchivo : string;
          RutaRespuestaHacienda : string;
          XmlSinFirma : string;
          XmlFirmado : string;
          XmlRespuesta : string;
          CorreoElectronico : string;



    constructor(){

    }
}