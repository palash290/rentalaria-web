import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lifestyle-sidebar',
  imports: [TranslateModule],
  templateUrl: './lifestyle-sidebar.component.html',
  styleUrl: './lifestyle-sidebar.component.css'
})
export class LifestyleSidebarComponent {

  constructor(private translate: TranslateService) { }
  
}
