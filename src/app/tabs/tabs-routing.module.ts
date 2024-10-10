import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'path',
    component: TabsPage,
    children: [
      {
        path: 'personajes',
        loadChildren: () => import('../pages/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'lugares',
        loadChildren: () => import('../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'buscador',
        loadChildren: () => import('../pages/tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'leerqr',
        loadChildren: () => import('../pages/tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: '',
        redirectTo: '/path/personajes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/path/personajes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
