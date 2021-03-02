import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUserCommentsComponent } from './blog-user-comments.component';

describe('BlogUserCommentsComponent', () => {
  let component: BlogUserCommentsComponent;
  let fixture: ComponentFixture<BlogUserCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogUserCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogUserCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
