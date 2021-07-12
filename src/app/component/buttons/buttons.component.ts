import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  templateUrl: 'buttons.component.html'
})
export class ButtonsComponent {
  tokenList: Array<string> = [];
  tokenId: string | any;
  toAddress: string | any;
  transferForm: FormGroup;
  constructor(
	  ) {
		this.transferForm = new FormGroup({
			toAddress: new FormControl(null, Validators.required)
		});
	}
	async ngOnInit(): Promise<void> {
		
		await this.getTokenInfo();
	}

  async getTokenInfo(){

    const vars = {};


     
		const windowObject = window as any;

  
		const account = new windowObject.Neon.wallet.Account(environment.consumerWallet);
		let paramArray = [{"type": "Hash160", "value": account.scriptHash}];
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
  
			let res = await contract.testInvoke("tokensOf", paramArray);
      let iterator = res.stack[0].iterator;

      let tempArray: any[] = [];
      iterator.forEach((element: { value: any; }) => {
        
        tempArray.push(element.value);
      });

      this.tokenList = [...tempArray];


    
  }

  
  
  async transferToken()
  {
    
    const vars = {};


     
    const windowObject = window as any;

  
    const account = new windowObject.Neon.wallet.Account(environment.consumerWallet);
    const toaccount = new windowObject.Neon.wallet.Account(environment.amazonPrivateKey);
    let paramArray = [{"type": "Hash160", "value": toaccount.scriptHash}, {"type": "ByteArray", "value": this.tokenId}, {"type": "String", "value": "Ravi"} ];
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
  
      let res = await contract.invoke("transfer", paramArray);
  }
}
