import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule,TranslatePipe],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  
  msgError:string = "";

  isLoading:boolean = false;

  registerForm:FormGroup = this.formBuilder.group(
    {
    name : [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ],
    email: [null , [Validators.required , Validators.email]],
    password:[ null , [Validators.required , Validators.pattern(/^[A-Z]\w{7}$/)]],
    rePassword:[ null , [Validators.required ]],
    phone:[ null,[Validators.required , Validators.pattern(/^01[012][0-9]{8}$/)]]
  },
  {validators:this.confirmPassword}
);

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
  //   email: new FormControl(null , [Validators.required , Validators.email]),
  //   password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7}$/)]),
  //   rePassword: new FormControl(null , [Validators.required ]),
  //   phone: new FormControl(null,[Validators.required , Validators.pattern(/^01[012][0-9]{8}$/)])
  // }, {validators:this.confirmPassword});

  sumbitForm():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message === 'success'){
          this.router.navigate(['/login'])
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
      this.registerForm ?.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
    } 
  };
  
  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch:true}
  };
}
