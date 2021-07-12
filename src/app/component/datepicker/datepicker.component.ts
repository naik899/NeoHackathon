import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

const my = new Date();

// This is for the range date picker
// tslint:disable-next-line:max-line-length
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day < two.day
        : one.month < two.month
      : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day > two.day
        : one.month > two.month
      : one.year > two.year;
// End range date picker

@Component({
  selector: 'app-datepicker-basic',
  templateUrl: './datepicker.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  styles: [
    `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: #0275d8;
        color: white;
      }
      .faded {
        opacity: 0.5;
      }
      .weekend {
        background-color: #242a33;
        border-radius: 1rem;
        color: white;
      }
      .hidden {
        display: none;
      }
    `
  ]
})
export class NgbdDatepickerBasicComponent {

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

  
		const account = new windowObject.Neon.wallet.Account(environment.amazonPrivateKey);
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
    
    if(this.toAddress == null || this.toAddress == undefined)
    {
      alert("To Address cannot be empty");
    }
    else{

     
      const vars = {};


     
      const windowObject = window as any;
  
    
      const toAddressInfo = new windowObject.Neon.wallet.Account(this.toAddress);
      const account = new windowObject.Neon.wallet.Account(environment.amazonPrivateKey);
      let paramArray = [{"type": "Hash160", "value": toAddressInfo.scriptHash}, {"type": "ByteArray", "value": this.tokenId}, {"type": "String", "value": "Ravi"} ];
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
}