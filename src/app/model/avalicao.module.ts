import {Orcamento} from './orcamento.module';
import {TipoAvaliacao} from './tipo-avalicao.module';
import {ItemAvaliacao} from './item-avaliacao.module';

export class Avaliacao {
  id: number;
  tipoAvaliacao: TipoAvaliacao;
  orcamento: Orcamento;
  codigoAvaliador: number;
  codigoAvaliado: number;
  observacao: string;
  nota: number;
  itensAvaliacao: ItemAvaliacao[];
}
