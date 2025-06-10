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

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Ensaio atualizar(Long id, Ensaio novo) {
        return repository.findById(id).map(e -> {
            e.setNome(novo.getNome());
            e.setDescricao(novo.getDescricao());
            e.setPreco(novo.getPreco());
            return repository.save(e);
        }).orElseThrow(() -> new RuntimeException("Ensaio não encontrado"));
    }
}
