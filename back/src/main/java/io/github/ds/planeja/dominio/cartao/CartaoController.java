package io.github.ds.planeja.dominio.cartao;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.ds.planeja.dominio.cartao.dto.CartaoDetalhes;
import io.github.ds.planeja.dominio.cartao.dto.CartaoForm;
import jakarta.validation.Valid;


@RestController 
@RequestMapping("cartoes")
public class CartaoController {
    
    @Autowired
    private CartaoService service;

    @GetMapping
    public ResponseEntity<List<CartaoDetalhes>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<CartaoDetalhes> criar(@Valid @RequestBody CartaoForm form) {
        CartaoDetalhes detalhes = service.criar(form);
        return ResponseEntity.status(HttpStatus.CREATED).body(detalhes);
    }

    @GetMapping("{id}")
    public ResponseEntity<CartaoDetalhes> obterDetalhes(@PathVariable("id") UUID id) {
        CartaoDetalhes detalhes = service.obterDetalhes(id);
        return ResponseEntity.ok(detalhes);
    }

    @PutMapping("{id}")
    public ResponseEntity<CartaoDetalhes> atualizar(@PathVariable("id") UUID id, @Valid @RequestBody CartaoForm form) {
        CartaoDetalhes detalhes = service.atualizar(id, form);
        return ResponseEntity.ok(detalhes);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") UUID id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
