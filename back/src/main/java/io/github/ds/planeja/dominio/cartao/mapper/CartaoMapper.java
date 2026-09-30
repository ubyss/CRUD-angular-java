package io.github.ds.planeja.dominio.cartao.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import io.github.ds.planeja.dominio.cartao.dto.CartaoDetalhes;
import io.github.ds.planeja.dominio.cartao.dto.CartaoForm;
import io.github.ds.planeja.dominio.cartao.model.CartaoEntity;

@Mapper(componentModel = "spring")
public interface CartaoMapper {
    CartaoEntity toEntity(CartaoForm form);

    CartaoDetalhes toDetalhes(CartaoEntity entity);

    void updateEntity(@MappingTarget CartaoEntity entity, CartaoForm dadosAtualizados);
}
