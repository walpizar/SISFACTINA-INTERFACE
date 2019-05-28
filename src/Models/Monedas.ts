import { TbCajaUsuMonedas } from './CajaUsuMonedas';
import { TbTipoMoneda } from './TipoMoneda';

export class TbMonedas{


    IdMoneda : string; 
    Moneda : string; 
    IdTipoMoneda : number; 
    Estado : boolean; 

    IdTipoMonedaNavigation : TbTipoMoneda; 
    TbCajaUsuMonedas : TbCajaUsuMonedas[];

    constructor(){

    }
}