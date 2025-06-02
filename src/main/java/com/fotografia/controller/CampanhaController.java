package com.fotografia.controller;

import com.fotografia.model.Campanha;
import com.fotografia.service.CampanhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campanhas")
public class CampanhaController {

    @Autowired
    private CampanhaService service;

    @GetMapping
    public List<Campanha> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Campanha buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).orElseThrow(() -> new RuntimeException("Campanha não encontrada"));
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
}
