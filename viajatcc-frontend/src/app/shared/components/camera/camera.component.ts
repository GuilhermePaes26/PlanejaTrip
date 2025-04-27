import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CameraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  
  @Output() getPicture = new EventEmitter<WebcamImage>();

  showCamera = true
  isCameraExist = true;

  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {

    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    })
  }

  takeSnapshot() {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage) {
    
    // this.getPicture.emit(webcamImage);

    this.dialogRef.close(webcamImage)

    this.showCamera = false;
    
    // this.dialogRef.close()
  }

  get triggerObservable(): Observable<void> {

    return this.trigger.asObservable();
  }
}