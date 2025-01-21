import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BandLookupComponent } from './band-lookup.component';

describe('BandLookupComponent', () => {
  let component: BandLookupComponent;
  let fixture: ComponentFixture<BandLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandLookupComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have tableCols', () => {
    expect(component.stats).toBeDefined();
  });

  

  
});
