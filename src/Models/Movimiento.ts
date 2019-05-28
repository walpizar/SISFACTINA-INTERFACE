import { TbTipoMovimiento } from './TipoMovimiento';
import { TbCreditos } from './Creditos';
import { TbDetalleMovimiento } from './DetalleMovimiento';
import { TbMovimientoCajaUsuario } from './MovimientoCajaUsuario';
import { TbPagos } from './Pagos';

export class TbMovimientos{

    IdMovimiento:number;
    Fecha : Date;
    IdTipoMov : number
    Estado : boolean;
    Motivo : String;
    Total : number;
    FechaUltMod : Date;
    FechaCrea : Date;
    UsuarioCrea : string
    UsuarioUltMod : String;

    IdTipoMovNavigation : TbTipoMovimiento;
    TbCreditos : TbCreditos[]; 
    TbDetalleMovimiento : TbDetalleMovimiento[]; 
    TbMovimientoCajaUsuario : TbMovimientoCajaUsuario[];
    TbPagos: TbPagos[];

    constructor(){

    }


}