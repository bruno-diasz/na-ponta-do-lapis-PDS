package com.npl.na_ponta_do_lapis.entity;

import jakarta.persistence.*;

import java.awt.*;
import java.util.Objects;

@Entity
@Table(name = "familia")
public class Familia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Lob
    @Column(name = "fotoFamilia", columnDefinition = "LONGLOB", nullable = false)
    private byte[] fotoFamilia;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Familia familia = (Familia) o;
        return id == familia.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte[] getFotoFamilia() {
        return fotoFamilia;
    }

    public void setFotoFamilia(byte[] fotoFamilia) {
        this.fotoFamilia = fotoFamilia;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
