import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { image } from 'html2canvas/dist/types/css/types/image';
import { LoginService} from './login.service'
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    public formGroup: FormGroup;
    isLogin: Observable<boolean>;
    public spinnerName: string;
    public spinnerType: string;

    constructor(private router: Router, private formBuilder: FormBuilder,private httpLogin:LoginService,private authService:AuthService,
      private spinner: NgxSpinnerService ) { 
      this.isLogin = new BehaviorSubject<boolean>(false);
      this.authService.isLoggedIn.subscribe(c => {
      });
  }

  public ngOnInit() {
    this.spinnerName = "spinnerLogin";
    //this.spinnerType = "square-spin";
    this.spinnerType = "ball-triangle-path";
    if (localStorage.getItem('codigo')) {
      this.router.navigate(['/']);
    }
    this.buildForm();
  }
  private buildForm() {
      this.formGroup = this.formBuilder.group({
        usuarioNombre:'',
        usuarioContrasenia: '',
        app:'HCG'
      });
  }

  login(){
    this.spinner.show(this.spinnerName);
    this.httpLogin.getLogin(this.formGroup.value).subscribe(
      c=>{
        if (c!=null && c>0){
          if(this.formGroup.value.app === 'HCG' ){
            localStorage.setItem('codigo',c.codigo);
            localStorage.setItem('tipo','HCG');
          }
          else{
            localStorage.setItem('codigo',c);
            localStorage.setItem('tipo','HCGCONTROL');
          }
          this.spinner.hide(this.spinnerName);
          window.location.reload();
          this.authService.loginInicial();
        } else {
          alert("Credenciales incorrectas!!!");
          this.spinner.hide(this.spinnerName);
        }
      },
      error=>{
        alert("Vuelva ingresar sus credenciales!!!");
        this.spinner.hide(this.spinnerName);
        console.error(error);
      }
    );
  }
}