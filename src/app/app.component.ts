import { config } from './config/backofficeConfig.config';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthentificationService } from './core/services/authentification/authentification.service';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'multiplayer-quiz-backoffice';
  isLoginRoute = false;      
  inactivityTimer: any;
  inactivityTimeout = config.timeout.inactivity;
  routerSubscription!: Subscription;
  
  constructor(
    private router: Router,
    public authentificationService: AuthentificationService,
    public sharedFunctionsService: SharedFunctionsService,
    public langService: LangService
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = this.router.url === '/login';
      }
    });
    this.resetInactivityTimer();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
    clearTimeout(this.inactivityTimer);
  }

  isDemo(): boolean {
    return localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken) === config.otherParameters.demo.demoAccessToken && 
    localStorage.getItem(config.localStorage.sufix + config.localStorage.refreshToken) === config.otherParameters.demo.demoRefreshToken;
  }

  logout(): void {
    const refreshToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.refreshToken)!;
    if (refreshToken && refreshToken !== config.otherParameters.demo.password) {
      this.authentificationService.logout(refreshToken);
    }
    this.sharedFunctionsService.clearLocalStorage();
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  @HostListener('window:scroll')
  resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      console.log('User inactive for 15 minutes. LOGOUT');
      this.logout();
    }, this.inactivityTimeout);
  }
}