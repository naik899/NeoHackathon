import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

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

    async mintToken()
	{

		const {name, description, points} = this.mintForm.value;
		if(name == "" || name == undefined)
		{
			alert("Name cannot be empty");
		}
		else if(description == "" || description == undefined)
		{
			alert("Description cannot be empty");
		}
		else if(points == "" || points == undefined)
		{
			alert("Points cannot be empty");
		}
		else{

			let imageUrl = points =="50" ? "https://gateway.pinata.cloud/ipfs/QmddSEeMvJqPhPT9cULvmEkyjvxEMSbV2cfckoZwx5h6Wj " : "https://gateway.pinata.cloud/ipfs/QmZd9qJexMRdKH1LhMfKsmHZFqyWCQSr2yzo62Qm1ZWhaY";
		
		
		const vars = {};

     
		const windowObject = window as any;

  
		const account = new windowObject.Neon.wallet.Account(environment.amazonPrivateKey);
		let paramArray = [{"type": "String", "value": name},{"type": "String", "value": description}, {"type": "String", "value": imageUrl}, {"type": "String", "value": points}]
  
		const scriptHashAccountAddress = windowObject.Neon.wallet.getScriptHashFromAddress(account.address);
		  let networkMagic = environment.networkMagic;
  
		  let rpcAddress= environment.nodeURL;
  
		  let config = {
			account
		  }
  
		  const contract = new windowObject.Neon.experimental.SmartContract(
		  windowObject.Neon.u.HexString.fromHex(environment.contractHash),
		  {
			networkMagic,
			rpcAddress,
			account,
		  },
		  config
		);
  
			let res = await contract.invoke("mint", paramArray);
			alert("Reward Points are minted successfully");
		}

	}


	

	
}
