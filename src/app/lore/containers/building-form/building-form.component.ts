import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Building } from '../../model/building';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';


@Component({
	selector: 'app-building-form',
	templateUrl: './building-form.component.html',
	styleUrls: ['./building-form.component.scss'],
})
export class BuildingFormComponent implements OnInit {
	building: Building = {} as Building;
	form: FormGroup = this.initForm();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private buildingService: BuildingService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');

		if (id !== null) {
			this.buildingService.get(id).subscribe((data) => {
				this.form = this.initForm(data);
				this.building = data;
			});
		}
	}

	initForm(building?: Building) {
		return this.formBuilder.group({
			name: new FormControl(
				building?.name || '', 
				[Validators.required, Validators.maxLength(50)]
			),
			
			address: new FormControl(
				building?.address || '',
				[Validators.required, Validators.maxLength(50)]
			),

			index: new FormControl(
				building?.index || '', [Validators.required, Validators.pattern('(^NO)([A-Z0-9]{1,9})')]
			),

			sectorCode: new FormControl(building?.sectorCode || ''
			),

			energyUnitMax: new FormControl(
				{
					value: building?.energyUnitMax || '',
					disabled: building?.id, 
				}, [Validators.required, Validators.max(2000)]
			),

			energyUnits: new FormControl(
				building?.energyUnits || '', Validators.required
			),
		});
	}


	hasError(path: string, errorCode: string) {
		return this.form && this.form.hasError(errorCode, path);
	}

	navigateToBuildingsList() {
		this.router.navigate(['buildings']).then();
	}

	submit() {
		console.log(this.form.value);
		const buildingToSave = { ...this.form.value, id: this.building.id };

			this.buildingService.put(buildingToSave).subscribe();
			
	}


	
  

	
}
