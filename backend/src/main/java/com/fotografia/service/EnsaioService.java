package com.fotografia.service;

import com.fotografia.model.Ensaio;
import com.fotografia.repository.EnsaioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnsaioService {
    @Autowired
    private EnsaioRepository repository;

    public List<Ensaio> listarTodos() {
        return repository.findAll();
    }

    public Optional<Ensaio> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Ensaio salvar(Ensaio ensaio) {
        return repository.save(ensaio);
    }

    public Ensaio atualizar(Long id, Ensaio novoEnsaio) {
        Ensaio ensaio = repository.findById(id).orElseThrow(() -> new RuntimeException("Ensaio não encontrado"));
        ensaio.setTitulo(novoEnsaio.getTitulo());
        ensaio.setDescricao(novoEnsaio.getDescricao());
        return repository.save(ensaio);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}