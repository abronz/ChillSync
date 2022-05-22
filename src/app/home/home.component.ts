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

  prgValue: any;
  prgPause: Boolean = false
  timer: any;

  ngOnInit() {
    // initialize youtube API
    this.video = "4VxdufqB9zg"
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    this.playerWidth = 1280
    this.playerHeight = 720
    window['onYouTubeIframeAPIReady'] = () => { this.startVideo() }

    // progress bar
    this.startSetInterval();

  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: this.playerHeight,
      width: this.playerWidth,
      videoId: this.video,
      playerVars: {
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
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
    this.player.setVolume(0)
    event.target.playVideo();
  }

  onInputChange(event) {
    clearInterval(this.timer)
    console.log(this.player.getDuration())
    var seekVal = this.player.getDuration()*(event.value/100)
    this.player.seekTo(seekVal, true)
    this.startSetInterval();
  }

  startSetInterval() {
    this.timer = setInterval(() => {
      if(this.player != null) {
        this.prgValue = this.player.getCurrentTime()/this.player.getDuration()*100;
      }
    }, 200)
  }
}
