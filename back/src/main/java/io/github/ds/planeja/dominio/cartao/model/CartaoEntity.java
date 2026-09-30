package io.github.ds.planeja.dominio.cartao.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "cartao")
@Getter
@Setter
public class CartaoEntity {

    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    @Column
    private UUID id;

    @Column (name = "nome", nullable = false, length = 30)
    private String nome;

    @Column (name = "bandeira", nullable = false)
    @Enumerated (EnumType.STRING)
    private BandeiraCartao bandeira;

    @Column (name = "data_cadastro", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDateTime.now();
    }
}
