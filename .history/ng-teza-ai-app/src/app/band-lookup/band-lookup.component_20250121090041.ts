import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, JsonPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http-service/http-service.service';
// import { GlobalVariables } from 'src/app/common/global-variables';
// import { Users } from '@app/common/data/users';
// import { HttpClientService } from '@app/services/http-service/http-service.service';

@Component({
  selector: 'app-band-lookup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers:[HttpService],
  templateUrl: './band-lookup.component.html',
  styleUrl: './band-lookup.component.scss'
})
export class BandLookupComponent  implements OnInit {
  isDisabled=false
  years:number[]=[1,2,3,4,5]
  stats:string = ''
  completion:any=null
  image:string=''
  qryText:string=''
  theYear:string=''
  bandForm = new FormGroup({
    apiKey: new FormControl(''),
    name: new FormControl('Radiohead'),
    band: new FormControl('Your favorite music band + a few words explaining why you chose them.'),
    year: new FormControl('2000')
  });



  

  constructor(
    private httpService:HttpService
   
  ) { 
    this.generateYears();
    // this.checkOddOrEven()
  }

  

  generateYears(): void {
    const startYear = 1965;
    const endYear = 2025;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.qryText = localStorage.getItem('qryTxt')?.toString() || ''
    if(this.qryText !==null){
      this.bandForm.patchValue({
        band:this.qryText
      })
    }
  }

  checkKey(){
    let payloadData = this.bandForm.value
    const keyVal = payloadData.apiKey
    this.isDisabled = false
    if(keyVal!==null && keyVal!== undefined && keyVal.length > 10)this.isDisabled = true
  }

  checkOddOrEven() {
    let payloadData = this.bandForm.value
    let val:any = payloadData.year?.toString()
    let num:number = parseInt(val)
    if (num % 2 === 0) {
      this.theYear = `The year ${val} is even`
    }
    else {
       this.theYear = `The year ${val} is Odd`
    }
  }

  onSubmit(){
   this.generateText()
   this.generateImage()
   this.generateStats()
}

generateText(){
  let payloadData = this.bandForm.value
  const apiKey:any = payloadData.apiKey
  this.qryText = `Provide two paragraphs of text describing what happened during the selected year for the chosen band ${payloadData.name } in year ${payloadData.year } and why I like them ${payloadData.band}`
  localStorage.setItem('qryTxt', this.qryText)
  this.httpService.postServiceData('https://api.openai.com/v1/chat/completions?', apiKey,
    {
      "model": "gpt-4o",
      "messages": [
          {"role": "user", "content":this.qryText }
      ],
  }).subscribe((data: any) => { 
    this.completion = JSON.stringify(data.choices[0].message.content)
   
  })
}

generateImage(){
  let payloadData = this.bandForm.value
  const apiKey:any = payloadData.apiKey
  this.httpService.postServiceData('https://api.openai.com/v1/images/generations?',apiKey,{
    "model": "dall-e-3",
    "prompt": `"${payloadData.name} in ${payloadData.year?.toString()}"`,
    "n": 1,
    "size": "1024x1024"
  }
      
  ).subscribe((data: any) => { 
    this.image = data.data[0].url
  })
}

  generateStats(){
    // 
    let payloadData = this.bandForm.value
    const apiKey:any = payloadData.apiKey
    this.httpService.postServiceData('https://api.openai.com/v1/chat/completions?', apiKey,
      {
        "model": "gpt-4o",
        "messages": [
            {"role": "user", "content": `In the following quote tell me how many words start with a capital and how many are followed by a number: "${this.qryText}"`}
        ],
    }).subscribe((data: any) => { 
      this.stats = JSON.stringify(data.choices[0].message.content)
     
    })

  }


}









