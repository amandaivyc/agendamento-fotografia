package com.fotografia.dto;

import java.util.List;

public class EmailRequest {
    private List<String> destinatarios;
    private String mensagem;

    // Getters e Setters
    public List<String> getDestinatarios() {
        return destinatarios;
    }

    public void setDestinatarios(List<String> destinatarios) {
        this.destinatarios = destinatarios;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
