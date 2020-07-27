import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogInfoComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
