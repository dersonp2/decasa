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

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private router: Router, private grupoService: GrupoService) {
    this.municipioId = Number(localStorage.getItem('municipioId'));
    this.classeId = Number(localStorage.getItem('classeId'));
    this.getGruposClassesByMunicipio(this.municipioId);
  }

  ngOnInit(): void {
  }

  public getGruposClassesByMunicipio(municipioId) {
    this.grupoService.getGruposClassesByMunicipio(municipioId).subscribe(
      (data) => {
        this.gruposClasses = data;
      },
      (error) => console.log(error)
    );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value).format('DD/MM/YYYY');
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
        orcamento =  JSON.parse(atob(localStorage.getItem('orcamento')));
      }
      orcamento.dataHora = this.date + ' ' + this.time;
      console.log(orcamento);
      localStorage.setItem('orcamento', btoa(JSON.stringify(orcamento)));
    }
  }
}
