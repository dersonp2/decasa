import {Router} from '@angular/router';
import {DialogLocalizacaoComponent} from '../../../blocos/dialog/dialog-localizacao/dialog-localizacao.component';
import {MatDialog} from '@angular/material/dialog';
import {GrupoService} from '../../../../../services/grupo.service';
import {TodosOsGruposEClassesResponse} from '../../../../../model/response/todos-os-grupos-classes-response.module';
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DragScrollComponent} from 'ngx-drag-scroll';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit {

  gruposClasses: TodosOsGruposEClassesResponse[];
  grupo: TodosOsGruposEClassesResponse;
  municipioId: number;
  classeId: number;
  @Output() respostaMunicipio = new EventEmitter();

  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor(private grupoService: GrupoService, public dialog: MatDialog, private spinner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('municipioId')) {
      this.getGruposClassesByMunicipio(localStorage.getItem('municipioId'));
    } else {
      this.getGruposClasses();
    }
  }

  // this.gruposClasses = data;
  getGruposClasses() {
    this.spinner.show();
    this.grupoService.getGruposAllClasses().subscribe(
      (data) => {
        this.gruposClasses = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  // Grupos e classes por municipio
  public getGruposClassesByMunicipio(municipioId) {
    this.municipioId = municipioId;
    this.grupoService.getGruposClassesByMunicipio(municipioId).subscribe(
      (data) => {
        this.gruposClasses = data;
      },
      (error) => console.log(error)
    );
  }

  // Menu de navegação
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogLocalizacaoComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('Fechou e recebeu data');
      console.log(res.data);
      this.goToOrcamento(this.classeId);
    });
  }

  // TODO: mudar para this.municipioID
  goToOrcamento(classeId) {
    if (localStorage.hasOwnProperty('municipioId')) {
      localStorage.setItem('classeId', classeId);
      this.router.navigateByUrl('/orcamento');
    } else {
      this.classeId = classeId;
      this.openModal();
    }
  }

}
