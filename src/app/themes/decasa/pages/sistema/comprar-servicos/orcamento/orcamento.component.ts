import {GrupoService} from '../../../../../../services/grupo.service';
import {TodosOsGruposEClassesResponse} from '../../../../../../model/response/todos-os-grupos-classes-response.module';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {Orcamento} from '../../../../../../model/orcamento.module';


@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  gruposClasses: TodosOsGruposEClassesResponse[];
  minDate = new Date();
  municipioId: number;
  classeId: number;
  date: any = null;
  time: any = null;

  // Configuração da data
  config = {
    locale: 'pt-br',
    min: moment(new Date(), 'DD-MM-YYYY'),
    enableMonthSelector: false,
    showGoToCurrent: true
  };

  constructor(private router: Router, private grupoService: GrupoService) {
    this.municipioId = Number(localStorage.getItem('municipioId'));
    this.classeId = Number(localStorage.getItem('classeId'));
    this.getGruposClassesByMunicipio(this.municipioId);
  }

  ngOnInit(): void {

    // Pegar a data e hora do orçamento
    let orcamento;
    if (localStorage.hasOwnProperty('orcamento')) {
      orcamento = JSON.parse(atob(localStorage.getItem('orcamento')));
      if (orcamento.dataHora) {
        const dataHora = orcamento.dataHora.split(' ');
        this.date = moment(dataHora[0], 'DD-MM-YYYY');
        this.time = dataHora[1];
      }
    }
  }

  public getGruposClassesByMunicipio(municipioId) {
    this.grupoService.getGruposClassesByMunicipio(municipioId).subscribe(
      (data) => {
        this.gruposClasses = data;
      },
      (error) => console.log(error)
    );
  }

  selectDate() {
    console.log(this.date);
    const d = moment(this.date).format('DD/MM/YYYY');
    console.log(d);
    this.saveDateTime();
  }

  onOpeningOrClosingTimeChanged(event) {
    this.time = event;
    this.saveDateTime();
  }

  // verifica se foi preenchido data e hora e salva no localStorage
  saveDateTime() {
    if (this.date != null && this.time != null) {
      let orcamento: Orcamento = new Orcamento();
      if (localStorage.getItem('orcamento')) {
        orcamento = JSON.parse(atob(localStorage.getItem('orcamento')));
      }
      const date = moment(this.date).format('DD/MM/YYYY');
      orcamento.dataHora = date + ' ' + this.time;
      console.log(orcamento);
      localStorage.setItem('orcamento', btoa(JSON.stringify(orcamento)));
    }
  }
}
