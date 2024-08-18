import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPlaylistsComponent } from './sidenav-playlists.component';

describe('SidenavPlaylistsComponent', () => {
  let component: SidenavPlaylistsComponent;
  let fixture: ComponentFixture<SidenavPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavPlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
