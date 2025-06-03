package com.fotografia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "ensaio_id")
    private Ensaio ensaio;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public Ensaio getEnsaio() {
        return ensaio;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public void setEnsaio(Ensaio ensaio) {
        this.ensaio = ensaio;
    }
}
