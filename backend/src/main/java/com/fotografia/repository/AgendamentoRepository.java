package com.fotografia.repository;

import com.fotografia.model.Agendamento;
import com.fotografia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByCliente(Usuario cliente);
}
