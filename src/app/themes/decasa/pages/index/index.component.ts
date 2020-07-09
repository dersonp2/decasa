import {Municipio} from '../../../../model/municipio.module';
import {ListaGruposComponent} from './lista-grupos/lista-grupos.component';
import {DialogLocalizacaoComponent} from '../../blocos/dialog/dialog-localizacao/dialog-localizacao.component';
import {MatDialog} from '@angular/material/dialog';
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PopoverContentComponent} from 'ngx-smart-popover';
import {MunicipioService} from '../../../../services/municipio.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  municipio: Municipio;
  grupos: any[];
  isDisplay = true;
  @ViewChild(ListaGruposComponent) listaGrupos: ListaGruposComponent;

  @ViewChild('popoverLocation') myPopover: PopoverContentComponent;

  // private gruposService: GruposService
  constructor(public dialog: MatDialog, private municipioService: MunicipioService) {
  }

  ngAfterViewInit(): void {
    this.showPopover();
  }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('municipioId')) {
      this.municipioService.buscarMunicipioPorId(localStorage.getItem('municipioId')).subscribe((data) => {
        this.municipio = data;
      });
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogLocalizacaoComponent, {
      width: '50%',
    });
    this.hidePopover();

    dialogRef.afterClosed().subscribe(res => {
      console.log(res.data);
      this.municipio = res.data;    // Recebe o id do município.
      this.listaGrupos.getGruposClassesByMunicipio(this.municipio.id);
    });
  }


  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  hidePopover() {
    // console.log('FEchhhoouuu');
    this.myPopover.hide();
  }

  showPopover() {
    // console.log('Abriu');
    this.myPopover.show();
  }

  reciverFeedback(respostaFilho) {
    console.log('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
  }

}
