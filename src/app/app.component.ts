import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('fullpageRef') fp_directive!: ElementRef;
  config: any;
  fullpage_api: any;

  tooltipColor: string = '#2d2d2d';

  constructor(){
    this.config = {
      licenseKey: 'SOFTWARE OPENSOURCE', // to request
      anchors: ['home', 'aboutme', 'skills'],
      menu: '#menu',
      navigation: true,
      sectionsColor: ['#fafafa', '#2d2d2d', '#2d2d2d'],


      // events callback
      onLeave:(origin: any, destination: any, direction: any) => {
        if(destination.isFirst){
          this.tooltipColor = '#2d2d2d';
        }else{
          this.tooltipColor = '#fafafa';
        }
      },
      afterLoad: (origin: any, destination: any, direction: any) => {
        /* if(destination.isFirst){
          this.tooltipColor = '#2d2d2d';
        }else{
          this.tooltipColor = '#fafafa';
        } */
      },
      afterRender: () => {
        // console.log('afterRender');
      },
      afterResize: (width: any, height: any) => {
        // console.log('afterResize' + width + ' ' + height);
      },
      afterSlideLoad: (section: any, origin: any, destination: any, direction: any) => {
        console.log("A")
      }
    };
  }



  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }
}
