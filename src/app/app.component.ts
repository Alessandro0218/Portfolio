import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Linguaggio } from './classi/linguaggio';

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
  placeholder: String = 'Alessandro';
  name: String = this.placeholder;
  max: number = this.name.length;
  current: number = this.max;
  status: string = 'left';

  timerName: any;
  resumeIntervall: (ms: number) => Promise<unknown>;

  windowWidth!: number;

  panelOpenState: Boolean = false;

  linguaggi: Linguaggio[] = [
    {url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png", name: "ANGULAR", color: "#ff222255"},
  ]

  constructor(private router: Router){
    this.resumeIntervall = (ms: number) => { 
      clearInterval(this.timerName)
      return new Promise(() => setTimeout(() => {
        this.updateName();
      }, ms))
    };

    this.config = {
      licenseKey: 'SOFTWARE OPENSOURCE', // to request
      anchors: ['home', 'aboutme', 'skills', 'contacts'],
      menu: '#menu',
      navigation: true,
      sectionsColor: ['#192BC2', '#2d2d2d', '#2d2d2d', '#2d2d2d'],

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

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    this.windowWidth = event.target.innerWidth;
  }

  isPhone(){
    return this.windowWidth > 500 ? false : true;
  }

  ngOnInit(){
    this.updateName();
  }

  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }

  updateName(){
    this.timerName = setInterval(async () => {
      let stopped = false;
      this.name = this.placeholder.substring(0, this.current);
      if(this.current >= this.max && this.status == 'right'){
        this.status = 'left';
        await this.resumeIntervall(2000);
      }else if(this.current <= 0 && this.status == 'left'){
        this.status = 'right';
        if(this.colorIndex > this.colors.length-1){
          this.colorIndex = 0;
        }
        document.getElementById('name')!.style.color = this.colors[this.colorIndex];
        this.colorIndex++;
      }

      if(this.status == 'left'){
        this.current = this.current - 1;
      }else if(this.status == 'right'){
        this.current = this.current + 1;
      }
    }, 200)
  }

  
}
