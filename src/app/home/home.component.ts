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

  public YT: any
  public video: any;
  public player: any;
  playerHeight: any;
  playerWidth: any;
  public reframed: Boolean = false;

  ngOnInit() {
    // this.URL = "https://www.youtube.com/watch?v=4VxdufqB9zg";
    // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4VxdufqB9zg'+this.playerVars)
    this.video = "4VxdufqB9zg"
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    this.playerWidth = 1280
    this.playerHeight = 720
    window['onYouTubeIframeAPIReady'] = () => { this.startVideo() }
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: this.playerHeight,
      width: this.playerWidth,
      videoId: this.video,
      playerVars: {
        disablekb: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this)
      }
    })
  }

  onPlayerStateChange(event) {
    // switch(event.data) {

    // }
  }

  onPlayerError(event) {
    switch(event.data) {
      case 2:
        console.log(`` + this.video)
        break
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  onPlayerReady(event) {
    this.player.setVolume(20)
  }

  getPlayerTime() {
    return Math.round(this.player.getCurrentTime())
  }

}
