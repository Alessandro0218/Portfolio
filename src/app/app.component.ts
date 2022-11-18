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

  colors = ['#FC7A57', '#419D78', '#B497D6', '#208AAE', '#F5B0CB', '#C2EFEB']
  colorIndex = 0;
  maxColorIndex = this.colors.length;

  /* @ViewChild('name') mionome!: ElementRef<HTMLSpanElement>; */
  placeholder: String = 'Alessandro Bertolli';
  name: String = this.placeholder;
  max: number = this.name.length;
  current: number = this.max;
  status: string = 'left';

  sleep: (ms: number) => Promise<unknown>;

  constructor(){
    this.sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.config = {
      licenseKey: 'SOFTWARE OPENSOURCE', // to request
      anchors: ['home', 'aboutme', 'skills'],
      menu: '#menu',
      navigation: true,
      sectionsColor: ['#192BC2', '#2d2d2d', '#2d2d2d'],

      // events callback
      onLeave:(origin: any, destination: any, direction: any) => {
      },
      afterLoad: (origin: any, destination: any, direction: any) => {
      },
      afterRender: () => {
      },
      afterResize: (width: any, height: any) => {
      },
      afterSlideLoad: (section: any, origin: any, destination: any, direction: any) => {
        console.log("A")
      }
    };
  }

  ngOnInit(){
    this.updateName();
  }

  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }

  updateName(){
    setInterval(async () => {
      let stopped = false;
      this.name = this.placeholder.substring(0, this.current);
      if(this.current == this.max){
        this.status = 'left';
        stopped=true;
        await this.sleep(2000);
        stopped=false;
      }else if(this.current == 0){
        this.status = 'right';
        if(this.colorIndex > this.colors.length-1){
          this.colorIndex = 0;
        }
        document.getElementById('name')!.style.color = this.colors[this.colorIndex];
        this.colorIndex++;
        
        /* this.mionome.nativeElement.style.color = this.colors[Math.random() * this.colors.length-1] */
      }

      if(this.status == 'left' && !stopped){
        this.current = this.current - 1;
      }else if(this.status == 'right' && !stopped){
        this.current = this.current + 1;
      }
    }, 200)
  }
  
}
