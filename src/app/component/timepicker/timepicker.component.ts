import { Component, Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NFTModels } from '../popover-tooltip/popover-tooltip.component';

  
@Component({
  selector: 'app-ngbd-timepicker',
  templateUrl: './timepicker.component.html'
 
})
export class NgbdtimepickerBasicComponent {
  nfts: Array<NFTModels> = [];
	
	 
	
  ngOnInit(): void {
   
   this.getNFTList();
   }

   async getNFTList()
   {
   const nodeURL =  environment.nodeURL;
   const contractHash = environment.contractHash;


   const vars = {};

    
   const windowObject = window as any;

 
   const account = new windowObject.Neon.wallet.Account(environment.consumerWallet);
   
 
   const scriptHashAccountAddress = windowObject.Neon.wallet.getScriptHashFromAddress(account.address);
     let networkMagic = environment.networkMagic;
 
     let rpcAddress= nodeURL;
 
     let config = {
     account
     }
 
     const contract = new windowObject.Neon.experimental.SmartContract(
     windowObject.Neon.u.HexString.fromHex(contractHash),
     {
     networkMagic,
     rpcAddress,
     account,
     },
     config
   );
 
   let res = await contract.testInvoke("tokens", []);
   let tokensStack = res.stack[0].iterator;
   this.getNFTIterator(tokensStack);
   
   }

   async getNFTIterator(iterator: any): Promise<void>
   {
   
   iterator.forEach(async (element: { value: string; })  => {
       await this.getNFTInfo(element.value);
   });
   }

   async getNFTInfo(byteString: string)
   {
   const nodeURL =  environment.nodeURL;
   const contractHash = environment.contractHash;


   const vars = {};

    
   const windowObject = window as any;

 
   let paramArray = [{"type": "ByteArray", "value": byteString}]

   
 
   const account = new windowObject.Neon.wallet.Account(environment.consumerWallet);
 
 
   const scriptHashAccountAddress = windowObject.Neon.wallet.getScriptHashFromAddress(account.address);
     let networkMagic = environment.networkMagic;
 
     let rpcAddress= nodeURL;
 
     let config = {
     account
     }
 
     const contract = new windowObject.Neon.experimental.SmartContract(
     windowObject.Neon.u.HexString.fromHex(contractHash),
     {
     networkMagic,
     rpcAddress,
     account,
     },
     config
   );
 
   let res = await contract.testInvoke("properties", paramArray);
   
   res.stack.forEach((element: any) => {
     this.getNFTDetailsFromMap(element.value);
   });
   }


   getNFTDetailsFromMap(mapObject: Map<any, any>){
    
   const windowObject = window as any;
   let nftContext: NFTModels = {
     name:"",
     owner: "",
     image:"",
     description: "",
     points:0
     };
   
   mapObject.forEach(async element => {
     
     let elementKey = windowObject.Neon.u.HexString.fromBase64(element.key.value).toAscii();
     if(elementKey == "owner")
     {
       let ownerValue = await this.getAddressFromByteString(element.value.value, windowObject);
       nftContext.owner = ownerValue;
     }
     switch(elementKey)
     {	
       case "name":
         nftContext.name = windowObject.Neon.u.HexString.fromBase64(element.value.value).toAscii();
       case "description":
         nftContext.description = windowObject.Neon.u.HexString.fromBase64(element.value.value).toAscii();
       case "image":
         nftContext.image = windowObject.Neon.u.HexString.fromBase64(element.value.value).toAscii();
       case "points":
         nftContext.points = Number.parseInt(windowObject.Neon.u.HexString.fromBase64(element.value.value).toAscii()) ;
   
     }
   });

   this.nfts.push(nftContext);

   }


   async getAddressFromByteString(byteString: string, windowObject: any): Promise<any>{

   let scriptHash = windowObject.Neon.u.reverseHex(windowObject.Neon.u.HexString.fromBase64(byteString).toString())
   let accountInfo = new windowObject.Neon.wallet.Account(scriptHash);
   debugger;
   return accountInfo.label;
   }
}
