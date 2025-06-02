package com.fotografia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clienteNome;
    private String email;
    private LocalDateTime dataHora;
    private String tipoEnsaio;
    private boolean confirmado;

    // Getters e Setters
}
