import { config } from 'src/app/config/backofficeConfig.config';
import { inputConfig } from 'src/app/config/inputConfig.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  demoUsername: string = config.otherParameters.demo.username;
  demoPassword: string = config.otherParameters.demo.password;
  loginForm: FormGroup = new FormGroup({});
  usernameError: string | null = null;
  passwordError: string | null = null;
  loginError: string | null = null;
  hidePassword = true;
  usernameMaxLength = inputConfig.loginParameters.username.max;
  passwordMaxLength = inputConfig.loginParameters.password.max;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public sharedFunctionsService: SharedFunctionsService,
    public authentificationService: AuthentificationService,
    public langService: LangService
  ) {}

  ngOnInit(): void {
    this.sharedFunctionsService.clearLocalStorage();
    
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(inputConfig.loginParameters.username.min), Validators.maxLength(inputConfig.loginParameters.username.max)]],
      password: ['', [Validators.required, Validators.minLength(inputConfig.loginParameters.password.min), Validators.maxLength(inputConfig.loginParameters.password.max)]]
    });
  }

  submit(): void {
    this.loginError = null;
    this.passwordError = null;
    this.usernameError = null;
    
    if (this.loginForm.valid) {      
      const { username, password } = this.loginForm.value;
      this.login(username, password);
    } else {                  
      const usernameCtrl = this.loginForm.get('username');
      if (usernameCtrl?.hasError('required')) {
        this.usernameError = this.langService.translate("login.errors.usernameRequired");
      } else if (usernameCtrl?.hasError('minlength')) {
        this.usernameError = this.langService.translate("login.errors.usernameTooShort");
      }

      const passwordCtrl = this.loginForm.get('password');
      if (passwordCtrl?.hasError('required')) {
        this.passwordError = this.langService.translate("login.errors.passwordRequired");
      } else if (passwordCtrl?.hasError('minlength')) {
        this.passwordError = this.langService.translate("login.errors.passwordTooShort");
      }
    }
  }

  login(username: string, password: string) {    
    if(username === config.otherParameters.demo.username && password === config.otherParameters.demo.password) {      
      localStorage.setItem(config.localStorage.sufix + config.localStorage.accessToken, config.otherParameters.demo.demoAccessToken);
      localStorage.setItem(config.localStorage.sufix + config.localStorage.refreshToken, config.otherParameters.demo.demoRefreshToken);    
      this.router.navigate(['/categories']);
    }
    else {
      this.authentificationService.login(username, password).subscribe({
        next: (res) => {
          localStorage.setItem(config.localStorage.sufix + config.localStorage.accessToken, res.accessToken);
          localStorage.setItem(config.localStorage.sufix + config.localStorage.refreshToken, res.refreshToken);    
          this.startTokenRefreshInterval();
          this.router.navigate(['/categories']);
        },
        error: (err) => {      
          console.error('Login error', err);
          this.loginError = this.langService.translate("login.errors.incorrectLogin");      
        }
      });
    }    
  }

  startTokenRefreshInterval() {
    setInterval(() => {
      this.refreshToken();
    }, config.timeout.token);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.refreshToken)!;
    this.authentificationService.refreshToken(refreshToken).subscribe({
      next: (res) => {
        localStorage.setItem(config.localStorage.sufix + config.localStorage.accessToken, res.accessToken);
      },
      error: (err) => {
        console.error('Token refresh error', err);
      }
    });
  }

  logout() {
    const refreshToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.refreshToken)!;
    this.authentificationService.logout(refreshToken).subscribe({
      next: () => {
        localStorage.clear();
      },
      error: (err) => {
        console.error('Logout error', err);
      }
    });
  }
}
