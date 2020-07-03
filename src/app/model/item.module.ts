import {TipoItem} from './tipo-item.module';

export class Item {
  id: number;
  descricao: string;
  simNao: boolean;
  tipoItem: TipoItem;
}
