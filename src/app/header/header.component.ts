import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  homeClicked() {
    this.router.navigate(['home']).then(() => location.reload());
  }

  aboutClicked() {
    this.router.navigate(['about']).then(() => location.reload());
  }
}
