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

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Campanha atualizar(Long id, Campanha novo) {
        return repository.findById(id).map(c -> {
            c.setTitulo(novo.getTitulo());
            c.setDescricao(novo.getDescricao());
            c.setAtiva(novo.isAtiva());
            return repository.save(c);
        }).orElseThrow(() -> new RuntimeException("Campanha não encontrada"));
    }
}
