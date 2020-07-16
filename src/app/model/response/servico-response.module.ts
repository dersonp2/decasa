import {Classe} from '../classe.module';

export class ServicoResponse {
  id: number;
  descricao: string;
  composicao: string;
  valor: number;
  nomeArquivo: string;
  classe?: Classe;
}
