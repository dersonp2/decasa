import { Component } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
interface Classe {
  name: string;
  children?: Classe[];
}

const TREE_DATA: Classe[] = [
  {
    name: 'Classe 1',
    children: [
      {name: 'Servico 1'},
      {name: 'Servico 2'},
      {name: 'Servico 3'},
    ]
  }, {
    name: 'Classe 2',
    children: [
      {
        name: 'Servico 5',
      }, {
        name: 'Servico 6',
      },
    ]
  },
];
@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent {
  treeControl = new NestedTreeControl<Classe>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Classe>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: Classe) => !!node.children && node.children.length > 0;
}
