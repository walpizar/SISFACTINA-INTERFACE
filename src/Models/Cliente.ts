import { TbPersona } from "./Personas";
import { TbDocumento } from './Documento';
import { TbTipoClientes } from './TipoCliente';
import { TbExoneraciones } from './Exoneraciones';

export class TbClientes{
Id: string;
TipoId: number;
TipoCliente: number;
Descripcion: string;
Estado: boolean;
PrecioAplicar: number;
DescuentoMax: number;
CreditoMax: number;
PlazoCreditoMax: number;
NombreTributario: string;
EncargadoConta: string;
CorreoElectConta: string;
IdExonercion: number;
FechaCrea: Date;
FechaUltMod: Date;
UsuarioCrea: string;
UsuarioUltCrea: string;
Contacto: string;
IdExonercionNavigation: TbExoneraciones;
TbPersona: TbPersona;
TipoClienteNavigation: TbTipoClientes;
TbDocumento: Array<TbDocumento>;

constructor(){

}
}
