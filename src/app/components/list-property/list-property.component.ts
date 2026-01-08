import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-property',
  imports: [RouterLink, TranslateModule],
  templateUrl: './list-property.component.html',
  styleUrl: './list-property.component.css'
})
export class ListPropertyComponent {

  constructor(private translate: TranslateService) { }
  
}
