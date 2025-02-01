import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit{
  // determinar si la imagen se cargo
  public hasLoad : boolean = false
  @Input()
  public url!: string;
  @Input()
  public alt: string = '';
  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required')
  }

  onLoad () :boolean{
    return this.hasLoad = true
  }

}
