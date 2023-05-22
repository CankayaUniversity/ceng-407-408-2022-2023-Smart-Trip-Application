import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'profile-setup-finalize',
    loadChildren: () => import('./profile-setup-finalize/profile-setup-finalize.module').then( m => m.ProfileSetupFinalizePageModule)
  },
  {
    path: 'profile-setup',
    loadChildren: () => import('./profile-setup/profile-setup.module').then( m => m.ProfileSetupPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'facility-review',
    loadChildren: () => import('./facility-review/facility-review.module').then( m => m.FacilityReviewPageModule)
  },
  {
    path: 'write-review',
    loadChildren: () => import('./write-review/write-review.module').then( m => m.WriteReviewPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
