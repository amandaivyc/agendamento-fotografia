package com.fotografia.service;

import com.fotografia.model.Usuario;
import com.fotografia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Usuario atualizar(Long id, Usuario novo) {
        return repository.findById(id).map(u -> {
            u.setNome(novo.getNome());
            u.setEmail(novo.getEmail());
            u.setSenha(novo.getSenha());
            u.setPerfil(novo.getPerfil());
            return repository.save(u);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
