import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;

  constructor(private router: Router, private service: CommonService) { }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleMenu() {
    this.toggleEvent.emit(false);
  }

  // logout() {
  //   localStorage.clear();
  //   this.closeModalAdd.nativeElement.click();
  //   this.router.navigateByUrl('/')
  // }

  logout() {
    this.service.clearToken();
    this.router.navigateByUrl('/');
    this.closeModalAdd.nativeElement.click();
    this.service.setLoginState(false);
    localStorage.removeItem('userEmail');
  }


}
