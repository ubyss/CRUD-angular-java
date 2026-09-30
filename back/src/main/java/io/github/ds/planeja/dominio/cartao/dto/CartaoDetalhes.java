package io.github.ds.planeja.dominio.cartao.dto;

import java.time.LocalDateTime;

import io.github.ds.planeja.dominio.cartao.model.BandeiraCartao;

public record CartaoDetalhes(String id, String nome, BandeiraCartao bandeira, LocalDateTime dataCadastro) {
    
}
