package com.npl.na_ponta_do_lapis.service;

import com.npl.na_ponta_do_lapis.entity.ContaFinanceira;
import com.npl.na_ponta_do_lapis.repository.ContaFinanceiraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaFinanceiraService {
    private final ContaFinanceiraRepository contaFinanceiraRepository;

    public ContaFinanceiraService(ContaFinanceiraRepository contaFinanceiraRepository) {
        this.contaFinanceiraRepository = contaFinanceiraRepository;
    }

    public ContaFinanceira criarConta(ContaFinanceira conta) {
        return contaFinanceiraRepository.save(conta);
    }

    public List<ContaFinanceira> listarContas() {
        return contaFinanceiraRepository.findAll();
    }
}