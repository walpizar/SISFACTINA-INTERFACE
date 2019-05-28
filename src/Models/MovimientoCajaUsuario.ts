import { TbMovimientos } from './Movimiento';
import { TbCajaUsuario } from './CajaUsuario';

export class TbMovimientoCajaUsuario{

    TbCajaUsuarioId : number;
    TbMovimientosIdMovimiento : number; 

    TbCajaUsuario : TbCajaUsuario 
    TbMovimientosIdMovimientoNavigation : TbMovimientos;

    constructor(){

    }
}