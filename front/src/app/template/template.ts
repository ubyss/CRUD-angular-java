import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

interface Cartao {
  id: string;
  nome: string;
  bandeira: string;
  dataCadastro: string;
}

@Component({
  imports: [ RouterLink, RouterLinkActive],
  selector: 'app-template',
  templateUrl: './template.html',
  styleUrl: './template.scss',
})
export class Template implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly pagina = this.route.snapshot.data['pagina'] as 'home' | 'cartoes' | 'cadastro';
  readonly tituloPagina = this.pagina === 'cartoes' ? 'Meus cartões' : this.pagina === 'cadastro' ? 'Cadastro de cartão' : 'Visão geral';

  readonly cartoes = signal<Cartao[]>([]);
  readonly busca = signal('');
  readonly carregando = signal(true);
  readonly erro = signal(false);
  readonly anoAtual = new Date().getFullYear();
  readonly bandeirasDisponiveis = ['VISA', 'MASTERCARD', 'ELO', 'AMERICAN_EXPRESS', 'DINERS_CLUB', 'HIPERCARD', 'AURA', 'JCB', 'PIX', 'OUTRO'];
  readonly formularioAberto = signal(false);
  readonly cartaoEmEdicao = signal<Cartao | null>(null);
  readonly cartaoParaExcluir = signal<Cartao | null>(null);
  readonly nomeFormulario = signal('');
  readonly bandeiraFormulario = signal('');
  readonly salvando = signal(false);
  readonly excluindo = signal(false);
  readonly mensagemErro = signal('');

  readonly cartoesFiltrados = computed(() => {
    const termo = this.busca().trim().toLocaleLowerCase('pt-BR');
    return this.cartoes().filter((cartao) =>
      `${cartao.nome} ${cartao.bandeira}`.toLocaleLowerCase('pt-BR').includes(termo),
    );
  });

  readonly bandeiras = computed(() => new Set(this.cartoes().map((cartao) => cartao.bandeira)).size);

  ngOnInit(): void {
    if (this.pagina !== 'cadastro') this.carregarCartoes();
  }

  carregarCartoes(): void {
    this.carregando.set(true);
    this.erro.set(false);

    this.http.get<Cartao[]>('/api/cartoes').subscribe({
      next: (cartoes) => {
        this.cartoes.set(cartoes);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }

  atualizarBusca(event: Event): void {
    this.busca.set((event.target as HTMLInputElement).value);
  }

  abrirNovo(): void {
    void this.router.navigate(['/cadastro-cartoes']);
  }

  abrirEdicao(cartao: Cartao): void {
    this.cartaoEmEdicao.set(cartao);
    this.nomeFormulario.set(cartao.nome);
    this.bandeiraFormulario.set(cartao.bandeira);
    this.mensagemErro.set('');
    this.formularioAberto.set(true);
  }

  fecharFormulario(): void {
    if (this.salvando()) return;
    if (this.pagina === 'cadastro') {
      void this.router.navigate(['/meus-cartoes']);
    } else {
      this.formularioAberto.set(false);
    }
  }

  atualizarNome(event: Event): void {
    this.nomeFormulario.set((event.target as HTMLInputElement).value);
  }

  atualizarBandeira(event: Event): void {
    this.bandeiraFormulario.set((event.target as HTMLSelectElement).value);
  }

  salvarCartao(event: Event): void {
    event.preventDefault();
    const nome = this.nomeFormulario().trim();
    const bandeira = this.bandeiraFormulario();
    if (!nome || nome.length > 30 || !bandeira || this.salvando()) return;

    const edicao = this.cartaoEmEdicao();
    const dados = { nome, bandeira };
    const requisicao = edicao
      ? this.http.put<Cartao>(`/api/cartoes/${edicao.id}`, dados)
      : this.http.post<Cartao>('/api/cartoes', dados);

    this.salvando.set(true);
    this.mensagemErro.set('');
    requisicao.subscribe({
      next: (cartao) => {
        this.cartoes.update((atuais) => edicao
          ? atuais.map((atual) => atual.id === edicao.id ? cartao : atual)
          : [cartao, ...atuais]);
        this.salvando.set(false);
        this.formularioAberto.set(false);
        if (this.pagina === 'cadastro') void this.router.navigate(['/meus-cartoes']);
      },
      error: () => {
        this.mensagemErro.set('Não foi possível salvar o cartão. Tente novamente.');
        this.salvando.set(false);
      },
    });
  }

  pedirExclusao(cartao: Cartao): void {
    this.mensagemErro.set('');
    this.cartaoParaExcluir.set(cartao);
  }

  cancelarExclusao(): void {
    if (!this.excluindo()) this.cartaoParaExcluir.set(null);
  }

  confirmarExclusao(): void {
    const cartao = this.cartaoParaExcluir();
    if (!cartao || this.excluindo()) return;
    this.excluindo.set(true);
    this.mensagemErro.set('');
    this.http.delete<void>(`/api/cartoes/${cartao.id}`).subscribe({
      next: () => {
        this.cartoes.update((atuais) => atuais.filter((atual) => atual.id !== cartao.id));
        this.excluindo.set(false);
        this.cartaoParaExcluir.set(null);
      },
      error: () => {
        this.mensagemErro.set('Não foi possível excluir o cartão. Tente novamente.');
        this.excluindo.set(false);
      },
    });
  }

  nomeBandeira(bandeira: string): string {
    const nomes: Record<string, string> = {
      AMERICAN_EXPRESS: 'American Express',
      DINERS_CLUB: 'Diners Club',
      MASTERCARD: 'Mastercard',
      HIPERCARD: 'Hipercard',
    };
    return nomes[bandeira] ?? bandeira.charAt(0) + bandeira.slice(1).toLowerCase();
  }

  iniciais(nome: string): string {
    return nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte.charAt(0)).join('').toUpperCase();
  }
}
