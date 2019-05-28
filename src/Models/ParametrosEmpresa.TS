import { TbEmpresa } from './Empresa';
export class TbParametrosEmpresa{

     Id : number;
         IdEmpresa : string;
         IdTipoEmpresa : number;
         UtilidadBase : number;
         ManejaInventario : boolean;
         CambioDolar : number;
         DescuentoBase : number;
         AprobacionDescuento : boolean;
         PrecioBase : number;
         FacturacionElectronica : boolean;
         ClienteObligatorioFact : boolean;
         PlazoMaximoCredito : number;
         PlazoMaximoProforma : number;

         IdNavigation : TbEmpresa;


    constructor(){

    }
}