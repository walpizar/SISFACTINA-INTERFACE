import { TbDocumento } from './Documento';
import { TbMonedas } from './Monedas';

export class TbTipoMoneda{

    Id : number; 
    Nombre : string; 
    Siglas : string; 
    Simbolo : string; 
    Estado : boolean; 

    TbDocumento : TbDocumento[]; 
    TbMonedas : TbMonedas[];

    constructor(){

    }
}