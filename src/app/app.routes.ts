import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
      {
            path: '', loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
            children: [
                  {
                        path: '',
                        loadComponent: () =>
                              import('./components/home/home.component').then(m => m.HomeComponent),
                  },
                  {
                        path: 'about',
                        loadComponent: () =>
                              import('./components/about/about.component').then(m => m.AboutComponent),
                  },
                  {
                        path: 'list-property',
                        loadComponent: () =>
                              import('./components/list-property/list-property.component').then(m => m.ListPropertyComponent),
                  },
                  {
                        path: 'list-form',
                        loadComponent: () =>
                              import('./components/list-property/listing-form/listing-form.component').then(m => m.ListingFormComponent),
                  },
                  {
                        path: 'contact-us',
                        loadComponent: () =>
                              import('./components/contact-us/contact-us.component').then(m => m.ContactUsComponent),
                  },
                  {
                        path: 'property-listing',
                        loadComponent: () =>
                              import('./components/all-property-list/all-property-list.component').then(m => m.AllPropertyListComponent),
                  },
                  {
                        path: 'view-property',
                        loadComponent: () =>
                              import('./components/all-property-list/view-property/view-property.component').then(m => m.ViewPropertyComponent),
                  },
                         {
                        path: 'lifestyle',
                        loadComponent: () =>
                              import('./components/lifestyle/lifestyle.component').then(m => m.LifestyleComponent),
                  },
                  {
                        path: 'view-lifestyle',
                        loadComponent: () =>
                              import('./components/lifestyle/view-lifestyle/view-lifestyle.component').then(m => m.ViewLifestyleComponent),
                  },
            ]
      },
         {
            path: 'admin',
            loadChildren: () => import('./components/admin/admin.routes').then(m => m.adminRoutes),
            // canActivate: [authGuard]
      },
];
