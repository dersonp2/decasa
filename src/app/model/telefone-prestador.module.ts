import { TipoPlanoTelefone } from './tipo-plano-telefone.module';
import { Operadora } from './operadora.module';
import { Prestador } from './prestador.module';

export class TelefonePrestador {
  id: number;
  telefone: string;
  operadora: Operadora;
  tipoPlanoTelefone?: TipoPlanoTelefone;
  prestador?: Prestador;

  constructor(telefone, operadora) {
    this.telefone = telefone;
    this.operadora = operadora;
  }
}
