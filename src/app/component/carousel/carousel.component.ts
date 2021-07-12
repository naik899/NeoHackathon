import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-ngbd-buttons-radio',
	templateUrl: './carousel.component.html',
	providers: [NgbCarouselConfig]
})
export class NgbdCarouselBasicComponent {

	mintForm: FormGroup;
	public image: string | any;
	constructor(
	  ) {
		this.mintForm = new FormGroup({
			name: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			points: new FormControl(null, Validators.required)
		});
	  }
	ngOnInit(): void {
		
		
	}

    mintToken()
	{

	}


	

	
}
