package com.fotografia.service;

import com.fotografia.model.Campanha;
import com.fotografia.repository.CampanhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampanhaService {
    @Autowired
    private CampanhaRepository repository;

    public List<Campanha> listarTodos() {
        return repository.findAll();
    }

    public Optional<Campanha> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Campanha salvar(Campanha campanha) {
        return repository.save(campanha);
    }

    public Campanha atualizar(Long id, Campanha novaCampanha) {
        Campanha campanha = repository.findById(id).orElseThrow(() -> new RuntimeException("Campanha não encontrada"));
        campanha.setTitulo(novaCampanha.getTitulo());
        campanha.setDescricao(novaCampanha.getDescricao());
        return repository.save(campanha);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}