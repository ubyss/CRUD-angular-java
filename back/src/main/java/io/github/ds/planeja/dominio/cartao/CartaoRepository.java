package io.github.ds.planeja.dominio.cartao;


import org.springframework.data.jpa.repository.JpaRepository;
import io.github.ds.planeja.dominio.cartao.model.CartaoEntity;

import java.util.UUID;

public interface CartaoRepository extends JpaRepository<CartaoEntity, UUID> {
    
}
