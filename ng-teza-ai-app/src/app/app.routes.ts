import { Routes } from '@angular/router';
import { BandLookupComponent } from './band-lookup/band-lookup.component';

export const routes: Routes = [
 { path: '', redirectTo: '/bands', pathMatch: 'full' },
 { path: 'bands', component: BandLookupComponent },

 
];
