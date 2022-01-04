import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'gui';

	constructor(translateService: TranslateService) {
		translateService.setDefaultLang('en');
		console.log(environment.apiUrl);
		
	}
}
