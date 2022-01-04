import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingFormComponent } from './lore/containers/building-form/building-form.component';
import { BuildingListComponent } from './lore/containers/building-list/building-list.component';
import { NewBuildingComponent } from './new-building/new-building.component';

const routes: Routes = [
	{ path: 'buildings', component: BuildingListComponent },
	{ path: 'building',
	children: [
		{
			path: 'new', component: NewBuildingComponent,
		},
		{ 
			path: ':id', component: BuildingFormComponent, 
		},
	],
},
{ path: '**', redirectTo: '/buildings', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
