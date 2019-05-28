import { TbMovimientos } from './Movimiento';
import { TbAbonos } from './Abonos';

export class TbCreditos{

    IdCredito : number; 
    IdCliente : string; 
    TipoCliente : number; //? 
    IdMov : number; 
    IdEstado : boolean; 
    EstadoCredito : boolean; 
    MontoCredito : number; 
    FechaUltMod : Date; 
    FechaCrea : Date 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 
    SaldoCredito : number; 

    IdMovNavigation : TbMovimientos; 
    TbAbonos : TbAbonos[]; 

    constructor(){

    }
}