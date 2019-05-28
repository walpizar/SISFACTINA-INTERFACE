import { TbClientes } from './Cliente';
import { TbEmpresa } from './Empresa';
import { TbTipoDocumento } from './TipoDocumento';
import { TbTipoMoneda } from './TipoMoneda';
import { TbTipoPago } from './TipoPago';
import { TbTipoVenta } from './TipoVenta';
import { TbDetalleDocumento } from './DetalleDocumento';

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




    constructor(){

    }
}