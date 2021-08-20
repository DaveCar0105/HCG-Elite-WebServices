import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { image } from 'html2canvas/dist/types/css/types/image';
import { LoginService} from './login.service'
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    public formGroup: FormGroup;
    isLogin: Observable<boolean>;
    constructor(private router: Router, private formBuilder: FormBuilder,private httpLogin:LoginService,private authService:AuthService ) { 
      this.isLogin = new BehaviorSubject<boolean>(false);
      this.authService.isLoggedIn.subscribe(c => {
      
      });
  }

  public ngOnInit() {
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
    console.log(this.formGroup.value.app);
    
    this.httpLogin.getLogin(this.formGroup.value).subscribe(
      c=>{
        if(this.formGroup.value.app === 'HCG' ){
          localStorage.setItem('codigo',c.codigo);
          localStorage.setItem('tipo','HCG');
        }
        else{
          localStorage.setItem('codigo',c);
          localStorage.setItem('tipo','HCGCONTROL');
        }
        
        window.location.reload();
        this.authService.loginInicial();
      },
      error=>{
        console.error(error);
        
      }
      
    );
  }
}