import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader"

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withInMemoryScrolling(scrollConfig)),

  provideAnimations(),
  provideHttpClient(
    withInterceptorsFromDi()
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
  provideAnimationsAsync(),
  provideTranslateService({
    lang: 'en',
    fallbackLang: 'en',
    loader: provideTranslateHttpLoader({
      prefix: 'i18n/',
      suffix: '.json'
    })
  }),
  ]
};


