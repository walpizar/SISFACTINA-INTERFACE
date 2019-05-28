import { TbMovimientos } from './Movimiento';

export class TbTipoMovimiento{

    IdTipo: number;
    Nombre : string; 
    Descripcion : string; 
    AfectaConta : number; 
    Estado : boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    TbMovimientos : TbMovimientos[];

    constructor(){

    }

}