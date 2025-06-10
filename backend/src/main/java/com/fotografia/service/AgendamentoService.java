// service/AgendamentoService.java
package com.fotografia.service;

import com.fotografia.model.Agendamento;
import com.fotografia.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;

    public List<Agendamento> listarTodos() {
        return repository.findAll();
    }

    public List<Agendamento> listarPorClienteId(Long id) {
        return repository.findByCliente_Id(id); // CORRETO
    }

    public Optional<Agendamento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Agendamento salvar(Agendamento agendamento) {
        return repository.save(agendamento);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
