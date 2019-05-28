import { TbBarrios } from './Barrios';
import { TbCanton } from './Canton';

export class TbDistrito{

    Provincia: string; 
    Canton : string; 
    Distrito : string; 
    Nombre : string; 

    TbCanton: TbCanton ;
    TbBarrios : TbBarrios[];

    constructor(){

    }
}