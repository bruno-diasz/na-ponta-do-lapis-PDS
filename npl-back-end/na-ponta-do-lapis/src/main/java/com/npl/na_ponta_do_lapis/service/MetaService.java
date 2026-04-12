package com.npl.na_ponta_do_lapis.service;

import com.npl.na_ponta_do_lapis.entity.Meta;
import com.npl.na_ponta_do_lapis.repository.MetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetaService {
    private final MetaRepository metaRepository;

    public MetaService(MetaRepository metaRepository) {
        this.metaRepository = metaRepository;
    }

    public Meta criarMeta(Meta meta) {
        return metaRepository.save(meta);
    }

    public List<Meta> listarMetas() {
        return metaRepository.findAll();
    }
}
