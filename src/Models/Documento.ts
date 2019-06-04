import { TbClientes } from './Cliente';
import { TbEmpresa } from './Empresa';
import { TbTipoDocumento } from './TipoDocumento';
import { TbTipoMoneda } from './TipoMoneda';
import { TbTipoPago } from './TipoPago';
import { TbTipoVenta } from './TipoVenta';
import { TbDetalleDocumento } from './DetalleDocumento';
import { DatePipe } from '@angular/common';

export class TbDocumento{


    Id : number; 
    TipoDocumento : number; 
    Consecutivo : string; 
    Clave : string; 
    ReporteElectronic : boolean; 
    Fecha : Date; 
    IdCliente : string; 
    TipoIdCliente : number; //? 
    TipoVenta : number; //? 
    Plazo : number; //? 
    TipoPago : number //? 
    RefPago : string; 
    TipoMoneda : number //? 
    TipoCambio : number //? 
    EstadoFactura :  number;
    EstadoFacturaHacienda : string; 
    ReporteAceptaHacienda : boolean; 
    MensajeReporteHacienda : string; 
    MensajeRespHacienda : boolean //? 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 
    Estado : boolean; 
    NotificarCorreo : boolean; 
    Correo1 : string; 
    Correo2 : string; 
    Observaciones : string; 
    IdEmpresa : string; 
    TipoIdEmpresa : number; 
    TipoDocRef : number //? 
    ClaveRef :  string;
    FechaRef : Date //?
    CodigoRef : number //?
    Razon : string;
    XmlSinFirma : string; 
    XmlFirmado : string; 
    XmlRespuesta : string; 

    TbClientes : TbClientes;
    TbEmpresa :  TbEmpresa;
    TipoDocumentoNavigation : TbTipoDocumento;
    TipoMonedaNavigation : TbTipoMoneda;
    TipoPagoNavigation : TbTipoPago; 
    TipoVentaNavigation  : TbTipoVenta;
    TbDetalleDocumento : TbDetalleDocumento[];



    mensaje:string;

    constructor(){

    }
    ValidarVencimientoCredito(fecha:Date,plazo:number):string{
        if (this.Fecha==null) {
            return null;
        } else {
            let milisegundos_por_dia=(1000*60*60*24);
            let fechaActual:Date;
            fechaActual= new Date("3/6/2019");
            let fechaDocumento=Date.UTC(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());
            let UTC=Date.UTC(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate());
            let result=Math.floor(UTC-fechaDocumento/milisegundos_por_dia);
            let texto:string;
            if (result>plazo) {
                texto="Al dia";
            } else {
                texto="Vencida";
            }
            return texto
        }
       
    }
}