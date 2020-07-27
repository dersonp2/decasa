import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {UploadFileService} from '../../../../../services/upload-file-service';
import {AnexoEvent} from '../../../../../events/anexo-event';
import {TipoAnexo} from '../../../../../model/tipo-anexo.module';
import {ArquivoOrcamentoService} from '../../../../../services/arquivo-orcamento.service';
import {ArquivoOrcamento} from '../../../../../model/arquivo-orcamento.module';
import {Orcamento} from '../../../../../model/orcamento.module';
import {DialogExcluirComponent} from '../dialog-excluir/dialog-excluir.component';
import { environment} from '../../../../../../environments/environment';

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
  s3Url = environment.S3_URL;
  loading = false;

  acceptTypes = null;

  constructor(public dialogRef: MatDialogRef<DialogAnexarComponent>, private arquivoOrcamentoService: ArquivoOrcamentoService,
              private uploadFileService: UploadFileService, public dialog: MatDialog, private anexoEvent: AnexoEvent, @Inject(MAT_DIALOG_DATA) public orcamentoId) {
    anexoEvent.alteracao$.subscribe(
      (data) => {
        (this.progress = data);
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

  onCategoryChange() {
    console.log(this.tipoControl.value.id);
    switch (this.tipoControl.value.id) {
      case 1:
        this.acceptTypes = '.doc, .docx, .txt, .pdf';
        break;
      case 2:
        this.acceptTypes = '.xlsx, .xls';
        break;
      case 3:
        this.acceptTypes = 'image/*';
        break;
      case 4:
        this.acceptTypes = 'video/mp4, video/x-m4v, video/*';
        break;
      case 5:
        this.acceptTypes = 'audio/*';
        break;
    }
  }

  onChangeFile(event) {
    this.selectedFile = event.target.files[0] as File;

    document.getElementById('fileLabel').innerHTML = this.selectedFile.name;
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
    this.saveArquivoOrcamento(arquivoOrcamento);

  }

  saveArquivoOrcamento(arquivoOrcamento) {
    this.arquivoOrcamentoService.salvarArquivoOrcamento(arquivoOrcamento).subscribe(
      (data) => {
        this.getAllArquivosOrcamento();
        if (this.progress === 100) {
          this.progress = 0;
          document.getElementById('fileLabel').innerHTML = '';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Apenas é inativado o arquivo
  deleteArquivoOrcamento(arquivoOrcamento: ArquivoOrcamento) {
    const dialogRef = this.dialog.open(DialogExcluirComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        arquivoOrcamento.arquivoAtivo = false;
        this.saveArquivoOrcamento(arquivoOrcamento);
      }
    });
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
