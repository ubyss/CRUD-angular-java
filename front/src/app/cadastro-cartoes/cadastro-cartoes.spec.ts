import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCartoes } from './cadastro-cartoes';

describe('CadastroCartoes', () => {
  let component: CadastroCartoes;
  let fixture: ComponentFixture<CadastroCartoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCartoes],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCartoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
