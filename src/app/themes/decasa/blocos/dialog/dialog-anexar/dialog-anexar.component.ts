import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {UploadFileService} from '../../../../../services/upload-file-service';
import {AnexoEvent} from '../../../../../events/anexo-event';
import {TipoAnexo} from '../../../../../model/tipo-anexo.module';
import {ArquivoOrcamentoService} from '../../../../../services/arquivo-orcamento.service';
import {ArquivoOrcamento} from '../../../../../model/arquivo-orcamento.module';
import {Orcamento} from '../../../../../model/orcamento.module';


@Component({
  selector: 'app-dialog-anexar',
  templateUrl: './dialog-anexar.component.html',
  styleUrls: ['./dialog-anexar.component.css']
})
export class DialogAnexarComponent implements OnInit {
  tipoControl = new FormControl('', Validators.required);
  tiposAnexo: TipoAnexo[] = [];
  displayedColumns: string[] = ['nome', 'opcoes'];
  dataSource = new MatTableDataSource();
  selectedFile: File = null;
  progress: any = 0;
  s3Url = 'https://documentosdecasa.s3.amazonaws.com/';
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAnexarComponent>, private arquivoOrcamentoService: ArquivoOrcamentoService,
              private uploadFileService: UploadFileService, private anexoEvent: AnexoEvent, @Inject(MAT_DIALOG_DATA) public orcamentoId) {
    anexoEvent.alteracao$.subscribe(
      (data) => {
        (this.progress = data);
        if (this.progress === 100) {
          this.progress = 0;
          document.getElementById('fileLabel').innerHTML = '';
        }
      }
    );
  }

  ngOnInit(): void {
    this.getAllArquivosOrcamento();
    this.arquivoOrcamentoService.getTipoAnexo().subscribe(
      (data) => {
        (this.tiposAnexo = data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  onChange(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];

    document.getElementById('fileLabel').innerHTML = this.selectedFile.name;
    console.info(this.selectedFile);
    console.log(this.tipoControl.value);
  }

  onUpload() {
    this.uploadFileService.uploadfile(this.selectedFile).subscribe(
      (data) => {
        console.log('upload file ok');
        this.addArquivoOrcamento(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onRemove(event) {

  }

  addArquivoOrcamento(data) {
    const orcamento = new Orcamento();
    orcamento.id = this.orcamentoId;
    const arquivoOrcamento = new ArquivoOrcamento();
    arquivoOrcamento.tipoAnexo = this.tipoControl.value;
    arquivoOrcamento.arquivo = data.key;
    arquivoOrcamento.arquivoAtivo = true;
    arquivoOrcamento.extensao = this.selectedFile.type;
    arquivoOrcamento.tamanho = this.selectedFile.size;
    arquivoOrcamento.dataCadastro = new Date();
    arquivoOrcamento.orcamento = orcamento;
    console.log(arquivoOrcamento);

    this.arquivoOrcamentoService.salvarArquivoOrcamento(arquivoOrcamento).subscribe(
      (data) => {
        this.getAllArquivosOrcamento();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteArquivoOrcamento(arquivoOrcamento: ArquivoOrcamento) {
    arquivoOrcamento.arquivoAtivo = false;

    this.arquivoOrcamentoService.atualizarArquivoOrcamento(arquivoOrcamento).subscribe(
      (data) => {
        this.getAllArquivosOrcamento();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getAllArquivosOrcamento() {
    this.loading = true;
    this.arquivoOrcamentoService.getArquivosByOrcamento(this.orcamentoId).subscribe(
      (data) => {
        this.dataSource.data = data;
        console.log(this.dataSource.data);
        this.loading = false;
      },
      (erro) => {
        console.log(erro);
        this.loading = false;
      }
    );
  }
}
