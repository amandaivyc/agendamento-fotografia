package com.fotografia.controller;

import com.fotografia.model.Ensaio;
import com.fotografia.service.EnsaioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ensaios")
public class EnsaioController {

    @Autowired
    private EnsaioService service;

    @GetMapping
    public List<Ensaio> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Ensaio buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).orElseThrow(() -> new RuntimeException("Ensaio não encontrado"));
    }

    @PostMapping
    public Ensaio criar(@RequestBody Ensaio ensaio) {
        return service.salvar(ensaio);
    }

    @PutMapping("/{id}")
    public Ensaio atualizar(@PathVariable Long id, @RequestBody Ensaio ensaio) {
        return service.atualizar(id, ensaio);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
