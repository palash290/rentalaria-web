import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '', loadComponent: () => import('../admin/main/main.component').then(m => m.MainComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'my-profile',
                loadComponent: () => import('../admin/my-profile/my-profile.component').then(m => m.MyProfileComponent)
            },
            {
                path: 'change-password',
                loadComponent: () => import('../admin/change-password/change-password.component').then(m => m.ChangePasswordComponent)
            },

            {
                path: 'my-inquires',
                loadComponent: () => import('../admin/my-inquires/my-inquires.component').then(m => m.MyInquiresComponent)
            },
            {
                path: 'inquery-details',
                loadComponent: () => import('../admin/my-inquires/inquiry-details/inquiry-details.component').then(m => m.InquiryDetailsComponent)
            },

            {
                path: 'saved-properties',
                loadComponent: () => import('../admin/saved-properties/saved-properties.component').then(m => m.SavedPropertiesComponent)
            },
            {
                path: 'my-property-details',
                loadComponent: () => import('../admin/saved-properties/my-property-details/my-property-details.component').then(m => m.MyPropertyDetailsComponent)
            },

            {
                path: 'my-properties',
                loadComponent: () => import('../admin/my-properties/my-properties.component').then(m => m.MyPropertiesComponent)
            },
            {
                path: 'add-property',
                loadComponent: () => import('../admin/add-property/add-property.component').then(m => m.AddPropertyComponent)
            },
        ]
    },

];
