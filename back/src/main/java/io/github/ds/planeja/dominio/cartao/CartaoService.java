package io.github.ds.planeja.dominio.cartao;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.ds.planeja.dominio.cartao.dto.CartaoDetalhes;
import io.github.ds.planeja.dominio.cartao.dto.CartaoForm;
import io.github.ds.planeja.dominio.cartao.mapper.CartaoMapper;
import io.github.ds.planeja.dominio.cartao.model.CartaoEntity;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository repository;

    @Autowired
    private CartaoMapper mapper;

    public List<CartaoDetalhes> listar() {
        return repository.findAll().stream().map(mapper::toDetalhes).toList();
    }


    public CartaoDetalhes criar(CartaoForm form) {
        CartaoEntity cartao = mapper.toEntity(form);
        CartaoEntity salvo = repository.save(cartao);
        return mapper.toDetalhes(salvo);
    }

    public CartaoDetalhes obterDetalhes(UUID id) {
        return repository.findById(id)
            .map(mapper::toDetalhes)
            .orElseThrow(() -> new CartaoNaoEncontradoException(id));
    }
    
    public CartaoDetalhes atualizar(UUID id, CartaoForm form) {
        CartaoEntity cartao = repository.findById(id)
            .orElseThrow(() -> new CartaoNaoEncontradoException(id));
        mapper.updateEntity(cartao, form);
        CartaoEntity salvo = repository.save(cartao);
        return mapper.toDetalhes(salvo);
    }

    public void deletar(UUID id) {
        CartaoEntity cartao = repository.findById(id)
            .orElseThrow(() -> new CartaoNaoEncontradoException(id));
        repository.delete(cartao);
    }
}
