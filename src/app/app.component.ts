import { Component, OnInit } from '@angular/core';
import { GiphyService } from './services/giphysearch.service';
import { giphySearch } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form!:FormGroup
  title = 'day33giphy';


  constructor(private giphySvc: GiphyService, private fb : FormBuilder){
  }

  ngOnInit(): void {
    this.form=this.createForm();
  }


  searchGiphy(giphy:string[]) {

    console.info(".>>>>>> searching Giphys: ", giphy);
    console.info(">>>>after onNewResult")
    
  }
  private createForm(): FormGroup{
    return this.fb.group({
      apiKey: this.fb.control<string>(this.getAPIKey(),[Validators.required]),
      results:this.fb.control<number>(10),
      searchTerm: this.fb.control<string>(''),
      rating: this.fb.control<string>(''),
    })
  }

  async getData() {
    const data=this.form.value
   
    let giphySearch : giphySearch = this.form.value as giphySearch

    console.info(giphySearch)
    this.giphySvc.onNewResult.next(await this.giphySvc.getGiphy(giphySearch));
    this.saveAPIKey(giphySearch.apiKey);
  
  }

  private getAPIKey():string{
    let key = localStorage.getItem('apiKey')
    if(!key)
      return '';
    return key;

  }

  private saveAPIKey(key:string){
    localStorage.setItem('apiKey',key)
  }

}


