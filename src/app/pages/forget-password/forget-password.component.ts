import { AuthService } from './../../core/services/auth/auth.service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule,TranslatePipe],
  selector: 'app-forget-password',
  styleUrl: './forget-password.component.scss',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);


  isLoading:boolean = false;

  step:number = 1;

  verifyEmail:FormGroup = this.formBuilder.group({
    email: [ null , [Validators.required , Validators.email] ]
  });

  verifyCode:FormGroup = this.formBuilder.group({
    resetCode: [ null , [Validators.required , Validators.pattern(/^[0-9]{6}$/) ]]
});

  resetPassword:FormGroup = this.formBuilder.group({
    email: [ null , [Validators.required , Validators.email] ],
    newPassword: [null , [Validators.required , Validators.pattern(/^[A-Z]\w{7}$/)] ]
});


verifyEmailSumbit():void{

  let emailValue = this.verifyEmail.get('email')?.value;

  this.resetPassword.get('email')?.patchValue(emailValue);

  this.isLoading = true;

  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg == 'success'){
        this.step = 2;
        this.changeDetectorRef.detectChanges();
      }
      this.isLoading = false;
    },
    error:(err)=>{
      console.log(err)
      this.isLoading = false;
    }
  })

}

verifyCodeSumbit():void{
  this.isLoading = true;
  this.authService.setCodeVerify(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status == 'Success'){
        this.step = 3;
        this.changeDetectorRef.detectChanges();
      }
      this.isLoading = false;
    },
    error:(err)=>{
      this.isLoading = false;
    }
  })

}

resetPasswordSumbit():void{
  this.isLoading = true;
  this.authService.setResetPas(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.isLoading = false;
      localStorage.setItem('userToken' , res.token);
      this.authService.saveUserData();
      this.router.navigate(['/home']) 
    },
    error:(err)=>{
      this.isLoading = false;
    }
  })

}
}
