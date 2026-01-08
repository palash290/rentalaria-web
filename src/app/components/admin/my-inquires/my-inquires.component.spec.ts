import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInquiresComponent } from './my-inquires.component';

describe('MyInquiresComponent', () => {
  let component: MyInquiresComponent;
  let fixture: ComponentFixture<MyInquiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInquiresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
