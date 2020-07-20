import {Orcamento} from './orcamento.module';
import {TipoAnexo} from './tipo-anexo.module';

export class ArquivoOrcamento {
  id: number;
  orcamento?: Orcamento;
  arquivo: string;
  extensao: string;
  dataCadastro: Date;
  observacao: string;
  tipoAnexo: TipoAnexo;
  arquivoAtivo: boolean;
  tamanho: number;
}
