import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList : Gif[] = [];
  private _taghistory : string[] = [];

  constructor(private http : HttpClient) {
    this.loadLocalstorage();
    this.cargarElPrimerResultado()
  }
  private apiKey : string = 'KoDPrwHdDhJ7HuyK9agEj6b79uL7jOKv' ;
  private url :string = `http://api.giphy.com/v1/gifs/`;
  get tagHistory(){
    return [...this._taghistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._taghistory.includes(tag)){
      this._taghistory = this._taghistory.filter( oldtag => oldtag !== tag );
    }
    this._taghistory.unshift(tag);
    this.saveLocalStorage();

  }

  public saveLocalStorage() : void {
    localStorage.setItem("history", JSON.stringify( this._taghistory))
  }
  public loadLocalstorage(): void {
    if(! localStorage.getItem('history')) return

    this._taghistory = JSON.parse( localStorage.getItem('history')!)
  }

  public cargarElPrimerResultado( ) : void{
   let arregloDeItems = JSON.parse( localStorage.getItem('history')!)
    this.searchtag(arregloDeItems[0])
  }
  public searchtag( tag: string):void {
    if(tag === '') return;

    this.organizeHistory(tag);
    const params = new HttpParams().set('api_key',this.apiKey).set('q', tag).set('limit', 10);
    this.http.get<SearchResponse>(`${this.url}search`,{params}).subscribe( resp => {
      this.gifList = resp.data

      console.log(this.gifList)
    })


  }
}

// ?api_key=KoDPrwHdDhJ7HuyK9agEj6b79uL7jOKv&q=valorant&limit=10
