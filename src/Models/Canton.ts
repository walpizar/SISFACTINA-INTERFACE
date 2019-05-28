import { TbDistrito } from './Distrito';
import { TbProvincia } from './Provincia';

export class TbCanton{


    Provincia : string; 
    Canton : string; 
    Nombre : string; 

    ProvinciaNavigation : TbProvincia; 
    TbDistrito : TbDistrito[] 

    constructor(){

    }
}