import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/auth/auth.service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule, RouterLink,TranslatePipe],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  msgError:string = "";

  isLoading:boolean = false;

  loginForm:FormGroup = this.formBuilder.group({
    email: [ null , [Validators.required , Validators.email] ],
    password: [null , [Validators.required , Validators.pattern(/^[A-Z]\w{7}$/)] ]
  });

  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl(null , [Validators.required , Validators.email]),
  //   password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7}$/)])
  // })
  sumbitForm():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message === 'success'){
          localStorage.setItem('userToken' , res.token);
          this.authService.saveUserData()
          this.router.navigate(['/home'])
        }
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err)
        this.msgError = err.error.message;
        this.cdr.detectChanges();
      
        this.isLoading = false;
      }

    })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
