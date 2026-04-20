package com.npl.na_ponta_do_lapis.web.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
<<<<<<< HEAD
import com.npl.na_ponta_do_lapis.entity.Transacao;
import com.npl.na_ponta_do_lapis.entity.enums.EstadoTransacao;
=======
>>>>>>> e4f88b5 (refactor:corrigindo POST criaTransacoes e implementando regra de negorcio ao criar transacao)
import com.npl.na_ponta_do_lapis.entity.enums.TipoTransacao;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;
<<<<<<< HEAD
import java.util.List;

public record TransacoesResponseDTO(
        Long id,
        String descricao,
        BigDecimal valor,
        TipoTransacao tipo,
        EstadoTransacao estado,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataHora,
        CategoriaResumoDTO categoria,
        ContaResumoDTO conta
) {
       public TransacoesResponseDTO(Transacao transacao){
               this(
                       transacao.getId(),
                       transacao.getDescricao(),
                       transacao.getValor(),
                       transacao.getTipo(),
                       transacao.getEstado(),
                       transacao.getDataHora(),
                       new CategoriaResumoDTO(
                               transacao.getCategoria().getId(),
                               transacao.getCategoria().getNome()
                       ),
                       new ContaResumoDTO(
                               transacao.getContaFinanceira().getId(),
                               transacao.getContaFinanceira().getNome()
                       )
               );
       };
=======

public record TransacoesResponseDTO(
        String descricao,
        BigDecimal valor,
        TipoTransacao tipo,
        Long idCategoria,
        Long idContaFinanceira,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataHora
) {
>>>>>>> e4f88b5 (refactor:corrigindo POST criaTransacoes e implementando regra de negorcio ao criar transacao)
}

