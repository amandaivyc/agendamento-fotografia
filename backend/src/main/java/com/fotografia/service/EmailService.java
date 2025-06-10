package com.fotografia.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmailService {

    public void enviarEmail(List<String> destinatarios, String mensagem, String assunto) {
        for (String destinatario : destinatarios) {
            System.out.println("Simulando envio de e-mail para: " + destinatario);
            System.out.println("Assunto: " + assunto);
            System.out.println("Mensagem: " + mensagem);
            System.out.println("-----");
        }
    }
}
