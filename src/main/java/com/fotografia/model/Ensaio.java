package com.fotografia.model;

import jakarta.persistence.*;

@Entity
public class Ensaio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private double preco;

    // Getters e Setters
}
