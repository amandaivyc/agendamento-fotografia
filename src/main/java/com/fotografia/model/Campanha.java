package com.fotografia.model;

import jakarta.persistence.*;

@Entity
public class Campanha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private boolean ativa;

    // Getters e Setters
}
