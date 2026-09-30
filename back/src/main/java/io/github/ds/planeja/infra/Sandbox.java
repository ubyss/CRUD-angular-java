package io.github.ds.planeja.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import io.github.ds.planeja.dominio.cartao.CartaoRepository;
import io.github.ds.planeja.dominio.cartao.model.BandeiraCartao;
import io.github.ds.planeja.dominio.cartao.model.CartaoEntity;

@Component
public class Sandbox implements CommandLineRunner {

    @Autowired
    private CartaoRepository repository;

    public void salvarCartao() {
        System.out.println("Salvando cartão");

        CartaoEntity cartao = new CartaoEntity();
        cartao.setNome("Cartão de Crédito");
        cartao.setBandeira(BandeiraCartao.MASTERCARD);

        repository.save(cartao);
    }

    @Override 
    public void run(String... args) throws Exception {
        salvarCartao();
    }
}
