import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public YT: any
  public videoID: any;
  public player: any;
  playerHeight: any;
  playerWidth: any;
  public reframed: Boolean = false;

  prgValue: any;
  prgPause: Boolean = false
  timer: any;
  query: String;
  loading: Boolean = true
  userCount: Number = 1;

  private socket: Socket

  constructor(private _socket: Socket) {
    this.socket = _socket
  }


  ngOnInit() {
    // initialize youtube API
    this.videoID = "yyL1h20g8Vs"
    //this.socket.emit("getVideo");
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    this.playerWidth = 1280
    this.playerHeight = 720
    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo()
      // progress bar
      this.startSetInterval();

      // code input
      this.query = ""

      //server initialize
      this.socket.emit("join", () => {})
      this.socketListeners(this.player)
    }
  }


  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: this.playerHeight,
      width: this.playerWidth,
      videoId: this.videoID,
      playerVars: {
        disablekb: 1,
        controls: 0,
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
  }

  onPlayerError(event) {
    switch(event.data) {
      case 2:
        console.log(`` + this.videoID)
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

  onInputChange(event) {
    clearInterval(this.timer)
    var seekVal = this.player.getDuration()*(event.value/100)
    this.socket.emit("seekVideo", seekVal)
    this.startSetInterval();
  }

  startSetInterval() {
    this.timer = setInterval(() => {
      if(this.player != null) {
        this.prgValue = this.player.getCurrentTime()/this.player.getDuration()*100;
      }
    }, 200)
  }

  onPlayClicked() {
    if(window['YT'].PlayerState.PAUSED)
      this.socket.emit("playVideo")
  }

  onPauseClicked() {
    if(window['YT'].PlayerState.PLAYING)
      this.socket.emit("pauseVideo")
  }

  onCodeSubmit() {
    if(this.query.length != 0)
    {
      this.socket.emit("changeVideo" ,this.query)
    }
  }

  socketListeners(player) {
    this.socket.on("playerReady", () => {
      this.loading = false
    })

    this.socket.on("changeUsersCount", (newCount) => {
      console.log(newCount)
      this.userCount = newCount
    })

    this.socket.on('changeVideo', (videoID) => {
      this.prgValue = 0
      clearInterval(this.timer)
      this.startSetInterval();
      player.loadVideoById(videoID)
    })

    this.socket.on('seekVideo', (time) => {
      player.seekTo(time, true)
    })

    this.socket.on('pauseVideo', () => {
      clearInterval(this.timer)
      player.pauseVideo()
    })

    this.socket.on('playVideo', () => {
      this.startSetInterval();
      player.playVideo()

      if(window['YT'].PlayerState.PAUSED)
        player.playVideo()
    })
  }
}
