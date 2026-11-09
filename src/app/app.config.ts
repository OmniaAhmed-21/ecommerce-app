import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptores/headers/headers-interceptor';
import { errorsInterceptor } from './core/interceptores/errors/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptores/loading/loading-interceptor';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// كلاس مخصص لجلب الترجمة مباشرة بالـ HttpClient بدون الحاجة لأي مكتبات خارجية قديمة
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([headersInterceptor, errorsInterceptor, loadingInterceptor])),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
};
