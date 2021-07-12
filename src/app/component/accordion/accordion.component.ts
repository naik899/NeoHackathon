import { Component } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ngbd-accordion-basic',
	templateUrl: 'accordion.component.html'
})
export class NgbdAccordionBasicComponent {
	
	storeAddress: string | any;

	async whitelistAddress(){

		const vars = {};


     
      const windowObject = window as any;
  
    
      const toAddressInfo = new windowObject.Neon.wallet.Account(this.storeAddress);
      const account = new windowObject.Neon.wallet.Account(environment.amazonPrivateKey);
      let paramArray = [{"type": "Hash160", "value": toAddressInfo.scriptHash}];
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
    
        let res = await contract.invoke("addWhitelistedStoreAddress", paramArray);

	}
}
