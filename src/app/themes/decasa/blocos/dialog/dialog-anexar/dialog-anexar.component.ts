import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {UploadFileService} from '../../../../../services/upload-file-service';
import {AnexoEvent} from '../../../../../events/anexo-event';
import {ClienteOrcamento} from '../../../../../model/response/cliente-orcamento.module';


interface Tipo {
  name: string;
}

@Component({
  selector: 'app-dialog-anexar',
  templateUrl: './dialog-anexar.component.html',
  styleUrls: ['./dialog-anexar.component.css']
})
export class DialogAnexarComponent {
  tipoControl = new FormControl('', Validators.required);
  tipos: Tipo[] = [
    {name: 'Documento'},
    {name: 'Vídeo'},
    {name: 'Imagem'},
  ];
  files: Set<File>;

  filesUpload = [];
  fileNames = [];

  displayedColumns: string[] = ['nome', 'opcoes'];
  dataSource = new MatTableDataSource<any>(this.filesUpload);
  selectedFile: File = null;

  constructor(public dialogRef: MatDialogRef<DialogAnexarComponent>, private uploadFileService: UploadFileService, private anexoEvent: AnexoEvent) {
    anexoEvent.alteracao$.subscribe(
      (data) => { console.log(data) }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  onChange(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    // const selectedFiles = <FileList> event.srcElement.files;
    // this.files = new Set();
    // this.fileNames = [];
    // // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   this.fileNames.push(selectedFiles[i].name);
    //   this.files.add(selectedFiles[i]);
    //   console.log('files ' + this.files);
    // }
    //
    document.getElementById('fileLabel').innerHTML = this.selectedFile.name;
  }

  onUpload() {
    this.uploadFileService.uploadfile(this.selectedFile);
    // if (this.files && this.files.size > 0) {
    //   console.log(this.fileNames);
    //   for (const file of this.fileNames) {
    //     this.filesUpload.push(file);
    //   }
    //   console.log('Uploads ' + this.filesUpload);
    //   this.dataSource.data = this.filesUpload;
    // }
  }

  onRemove(event) {
    const index = this.filesUpload.indexOf(event);
    this.filesUpload.splice(index, 1);
    this.dataSource.data = this.filesUpload;
  }

}
