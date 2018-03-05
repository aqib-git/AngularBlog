import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFrontComponent } from './blog-front.component';

describe('BlogFrontComponent', () => {
  let component: BlogFrontComponent;
  let fixture: ComponentFixture<BlogFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
