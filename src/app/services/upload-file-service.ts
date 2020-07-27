import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {AnexoEvent} from '../events/anexo-event';
import {Observable, Observer} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  FOLDER = 'arquivos/';

  constructor(private anexoEvent: AnexoEvent) {
  }

  uploadfile(file): Observable<any> {
    {

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

      return new Observable((observer: Observer<any>) => {
        bucket.upload(params, function(err, data) {
          if (err) {
            console.log('There was an error uploading your file: ', err);
            observer.error(err);
          }
          console.log('Successfully uploaded file.', data);
          observer.next(data);
          observer.complete();
        }).on('httpUploadProgress', (progress) => {
          const percentage = Math.round((progress.loaded) * 100 / progress.total);
          this.anexoEvent.alteracao(percentage);
        });
      });
    }
  }
}
