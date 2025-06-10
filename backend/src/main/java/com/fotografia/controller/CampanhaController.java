package com.fotografia.controller;

import com.fotografia.dto.EmailRequest;
import com.fotografia.service.EmailService;
import com.fotografia.model.Campanha;
import com.fotografia.service.CampanhaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/campanhas")
public class CampanhaController {

    @Autowired
    private CampanhaService service;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Campanha> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Campanha buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));
    }

    @PostMapping
    public Campanha criar(@RequestBody Campanha campanha) {
        return service.salvar(campanha);
    }

    @PutMapping("/{id}")
    public Campanha atualizar(@PathVariable Long id, @RequestBody Campanha campanha) {
        return service.atualizar(id, campanha);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PostMapping("/{id}/enviar-email")
    public ResponseEntity<String> enviarEmailCampanha(
            @PathVariable Long id,
            @RequestBody EmailRequest emailRequest
    ) {
        Optional<Campanha> campanhaOpt = service.buscarPorId(id);

        if (campanhaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Campanha campanha = campanhaOpt.get();
        String assunto = "Promoção: " + campanha.getTitulo(); // corrigido aqui

        emailService.enviarEmail(emailRequest.getDestinatarios(), emailRequest.getMensagem(), assunto);

        return ResponseEntity.ok("E-mails enviados com sucesso!");
    }
}
