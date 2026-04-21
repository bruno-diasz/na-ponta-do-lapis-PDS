package com.npl.na_ponta_do_lapis.web.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
<<<<<<< HEAD
<<<<<<< HEAD
import com.npl.na_ponta_do_lapis.entity.enums.EstadoTransacao;
=======
>>>>>>> e4f88b5 (refactor:corrigindo POST criaTransacoes e implementando regra de negorcio ao criar transacao)
=======
import com.npl.na_ponta_do_lapis.entity.enums.EstadoTransacao;
>>>>>>> f2c067a (refactor(Transacoes ): corrigindo endpoint transacao, add regra de negocio no atualizar Transacao e melhorando resposta dos endpoits transacoes)
import com.npl.na_ponta_do_lapis.entity.enums.TipoTransacao;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransacaoRequestDTO(
        @Size(min = 1, max = 254)
        @NotNull(message = "A Descrição não pode ser null!")
        @NotBlank(message = "O campo não pode estar vazio!")
        String descricao,
        @NotNull(message = "O valor não pode ser null!")
        @Positive(message = "O valor da transação deve ser maior que zero!")
        BigDecimal valor,

        @NotNull(message = "O Tipo transacao não pode ser null!")
        TipoTransacao tipo,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f2c067a (refactor(Transacoes ): corrigindo endpoint transacao, add regra de negocio no atualizar Transacao e melhorando resposta dos endpoits transacoes)

        EstadoTransacao estado,

        @NotNull(message = "ID categoria não pode ser null!")
        Long idCategoria,

<<<<<<< HEAD
=======
        @NotNull(message = "ID categoria não pode ser null!")
        Long idCategoria,
>>>>>>> e4f88b5 (refactor:corrigindo POST criaTransacoes e implementando regra de negorcio ao criar transacao)
=======
>>>>>>> f2c067a (refactor(Transacoes ): corrigindo endpoint transacao, add regra de negocio no atualizar Transacao e melhorando resposta dos endpoits transacoes)
        @NotNull(message = "ID conta financeira não pode ser null")
        Long idContaFinanceira,

        @Schema(type = "string", pattern = "dd/MM/yyyy HH:mm", example = "20/04/2026 15:30")
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataHora
) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    public TransacoesResponseDTO toTransacoesResponseDTO(){
        return new TransacoesResponseDTO(descricao, valor, tipo, idCategoria, idContaFinanceira, dataHora);
    }
>>>>>>> e4f88b5 (refactor:corrigindo POST criaTransacoes e implementando regra de negorcio ao criar transacao)
=======
>>>>>>> f2c067a (refactor(Transacoes ): corrigindo endpoint transacao, add regra de negocio no atualizar Transacao e melhorando resposta dos endpoits transacoes)
}
