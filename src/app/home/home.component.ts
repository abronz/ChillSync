import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private sanitizer: DomSanitizer) { }

  URL: string
  safeURL: SafeResourceUrl
  playerVars: any

  ngOnInit() {
    this.URL = "https://www.youtube.com/watch?v=4VxdufqB9zg";
    this.playerVars = "?disablekb=1&controls=0&modestbranding=1&rel=0&showinfo=0&autoplay=0"
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4VxdufqB9zg'+this.playerVars)


  }

}
