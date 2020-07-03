import {Item} from './item.module';

export class ItemAvaliacao {
  id: number;
  nota: number;
  observacao: string;
  item: Item;

  constructor(item) {
    this.item = item;
  }
}
