import { ServicoResponse } from './servico-response.module';
import { UnidadeMedidaResponse } from './unidade-medida-response.module';
import {Classe} from '../classe.module';

export class ServicoOrcamentoResponse {
  id: number;
  quantidade: number;
  valor: number;
  servico: ServicoResponse;
  unidadeMedida: UnidadeMedidaResponse;
}
