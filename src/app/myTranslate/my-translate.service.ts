import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class MyTranslateService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly rendererFactory2 = inject(RendererFactory2);
    private renderer2!: Renderer2;

    constructor(private translateService: TranslateService) {
        this.renderer2 = this.rendererFactory2.createRenderer(null, null);

        if (isPlatformBrowser(this.platformId)) {
            // بنحدد اللغة الافتراضية الأول
            this.translateService.use('en');

            const savedLang = localStorage.getItem('lang') || 'en';
            this.translateService.use(savedLang);
            this.changeDirection(savedLang);
        }
    }

    changeDirection(lang: string): void {
        if (lang === 'ar') {
            this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
            this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
        } else {
        
            this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
            this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
        }
    }

    changeLangTranslate(lang: string): void {
        // local storage
        localStorage.setItem('lang', lang);
        // use lang
        this.translateService.use(lang);
        // change direction
        this.changeDirection(lang);
    }
}
