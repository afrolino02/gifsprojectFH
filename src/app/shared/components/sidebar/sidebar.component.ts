import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor( private GifsService: GifsService){}

  get lista() {
    return this.GifsService.tagHistory
  }

   public irA(tag : string){
    return this.GifsService.searchtag(tag)
  }

}
