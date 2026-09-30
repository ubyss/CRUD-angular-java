package io.github.ds.planeja.dominio.cartao;

import java.util.UUID;

public class CartaoNaoEncontradoException extends RuntimeException {

    public CartaoNaoEncontradoException(UUID id) {
        super("Cartão não encontrado para o ID " + id + ".");
    }
}
