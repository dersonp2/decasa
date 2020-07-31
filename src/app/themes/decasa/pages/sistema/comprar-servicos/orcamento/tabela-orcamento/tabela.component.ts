import {ServicosOrcamento} from '../../../../../../../model/servico-orcamento.module';
import {ClasseEvent} from '../../../../../../../events/classe-event';
import {ServicoService} from '../../../../../../../services/servico.service';
import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Servico} from 'src/app/model/servico.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogInfoComponent} from '../../../../../blocos/dialog/dialog-info/dialog-info.component';
import {DialogQuantidadeComponent} from '../../../../../blocos/dialog/dialog-quantidade/dialog-quantidade.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  @Input() classeId: number;
  servicosSelecionados: ServicosOrcamento[] = [];
  municipioId: number;
  classeDescricacao: string;

  displayedColumns: string[] = ['select', 'descricao'];
  dataSource = new MatTableDataSource<ServicosOrcamento>();
  servicos: Servico[];
  dt: ServicosOrcamento[] = [];

  // tslint:disable-next-line:variable-name
  constructor(public dialog: MatDialog, private servicoService: ServicoService, private classeService: ClasseEvent,
              private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    classeService.alteracao$.subscribe(
      (data) => {
        this.getServicoByClasseAndMunicipio(data);
      }
    );
  }

  ngOnInit(): void {
    this.municipioId = Number(localStorage.getItem('municipioId'));
    this.getServicoByClasseAndMunicipio(this.classeId);
  }

  // Pegar todos os servicos por classe e municipio
  getServicoByClasseAndMunicipio(classeId) {
    this.spinner.show();
    this.servicoService.getServicoByClasseAndMunicipio(classeId, this.municipioId).subscribe(
      (data) => {
        this.servicos = data;
        this.getElementData();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  // Preencher a tabela
  getElementData() {
    let mensagem: string;
    let classe: string;
    this.dt = [];
    this.servicos.forEach(item => {
      this.dt.push(new ServicosOrcamento(1, item));
    });
    if (this.dt.length === 0) {
      mensagem = 'Sem serviços para essa classe';
      classe = 'orange-snackbar';
    } else {
      this.classeDescricacao = this.servicos[0].classe.descricao;
      mensagem = 'Tabela atualizada';
      classe = 'blue-snackbar';
    }
    this.spinner.hide();
    this.showSnackBar(mensagem, classe);
  }

  showSnackBar(mensagem, cor) {
    this._snackBar.open(mensagem, '', {
        duration: 3000,
        panelClass: [cor]
      }
    );
  }

  // adicionarServico(servico) {
  // this.openDialogQuantidade(servico);
  // console.log(servico);
  // if (localStorage.hasOwnProperty('servicosSelecionados')) {
  //   this.servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados'));
  // }
  // this.servicosSelecionados.push(servico);
  // localStorage.setItem('servicosSelecionados', JSON.stringify(this.servicosSelecionados));
  // this.carrinhoService.alteracao();
  // this.showSnackBar('Serviço inserido no carrinho', 'blue-snackbar');
  // }

  openDialogInfo(composicao) {
    this.dialog.open(DialogInfoComponent, {
      width: '50%',
      data: composicao
    });
  }


  openDialogQuantidade(servicoOrcamento) {
    this.dialog.open(DialogQuantidadeComponent, {
      data: servicoOrcamento
    });
  }
}
