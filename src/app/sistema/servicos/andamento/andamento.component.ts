import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  @Input() nome: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
