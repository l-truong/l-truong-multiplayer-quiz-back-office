import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { LangService } from 'src/app/services/translation/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'multiplayer-quiz-backoffice';
  isLoginRoute = false;  
  
  constructor(
    private router: Router,
    public langService: LangService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = this.router.url === '/login';
      }
    });
  }
}