import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)

  return next(req).pipe(catchError((err)=>{

    console.log('interceptor' , err.error.message)
    
    if (err.status !== 401) {
        toastrService.error(err.error?.message || 'An error occurred', 'freshCart');
    }

    return throwError(  ()=>{err })
  }));
};




