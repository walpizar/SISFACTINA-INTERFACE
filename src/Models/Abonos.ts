import { TbCreditos } from './Creditos';

export class TbAbonos{

    IdAbono : number; 
    IdDoc : number; 
    TipoDoc: number; 
    Monto : number //? 
    FechaUltMod : Date;
    FechaCrea : Date; 
    UsuarioCrea: string; 
    UsuarioUltMod : string; 
    Estado : boolean; 

    IdDocNavigation : TbCreditos; 
    constructor(){

    }
}