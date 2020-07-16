import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {AnexoEvent} from '../events/anexo-event';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  FOLDER = 'arquivos/';

  constructor(private anexoEvent: AnexoEvent) {
  }

  uploadfile(file) {
    // tslint:disable-next-line:prefer-const
    let retorno: any;

    const bucket = new S3(
      {
        accessKeyId: 'AKIAYX56DUSYQOWUH3XJ',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'documentosdecasa',
      Key: this.FOLDER + file.name,
      Body: file
    };


    // tslint:disable-next-line:only-arrow-functions
    bucket.upload(params, function(err, data) {
      if (err) {
        console.log('Ocorreu um erro ao fazer upload do seu arquivo: ', err);
      }
      console.log('Successfully uploaded file.', data);
    }).on('httpUploadProgress', (progress) => {
      const percentage = Math.round((progress.loaded) * 100 / progress.total);
      console.log('Progresso');
      console.log(percentage);
      this.anexoEvent.alteracao(percentage);
    });

  }
}
