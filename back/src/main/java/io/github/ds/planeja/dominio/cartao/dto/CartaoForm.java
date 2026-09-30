package io.github.ds.planeja.dominio.cartao.dto;

import io.github.ds.planeja.dominio.cartao.model.BandeiraCartao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CartaoForm(
        @NotBlank(message = "O nome é obrigatório.")
        @Size(max = 30, message = "O nome deve ter no máximo 30 caracteres.")
        String nome,

        @NotNull(message = "A bandeira é obrigatória.")
        BandeiraCartao bandeira) {
}
