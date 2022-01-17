import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import jsQR  from 'jsqr';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Receipt} from "../../../../models/Receipt";
import {AuthenticationService} from "../../../../shared/authentication.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('video')
  public video!: ElementRef;

  @ViewChild('canvas')
  public canvas!: ElementRef;

  receipt!: Receipt;
  userToken!: string;

  requestId!: number | undefined;

  constructor(private location: Location, private httpClient: HttpClient, private  authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.currentUser$
      .pipe(filter(x => x != null))
      .subscribe((x: any) => {
        this.userToken = x.stsTokenManager.accessToken;
      });
  }

  onBack() {
    this.location.back();
  }

  public capture() {
    let self = this;

    const video = this.video.nativeElement;
    const canvasElement = this.canvas.nativeElement;
    const canvas = canvasElement.getContext('2d');

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
        video.play();
        this.requestId = requestAnimationFrame(tick);
      });

    function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;

        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          if (self.requestId) {
            cancelAnimationFrame(self.requestId);
          }

          self.requestId = undefined;

          console.log(code.data);

          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            '#FF3B58'
          );
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            '#FF3B58'
          );
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            '#FF3B58'
          );
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            '#FF3B58'
          );

          const data = JSON.parse(
            '{"' +
            decodeURI(code.data)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
          );

          self.httpClient.post<any>(`${environment.functionsUrl}/check`, data,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + self.userToken,
                'Host': "us-central1-wesplit-840b9.cloudfunctions.net"
              }
            }).subscribe(
            (res: Receipt) => {
              self.receipt = res;
            },
            (err: any) => console.log(err)
          );
        }
      }

      requestAnimationFrame(tick);
    }

    function drawLine(begin: any, end: any, color: string) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }
  }
}
