package com.fotografia.controller;

import com.fotografia.model.Usuario;
import com.fotografia.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return service.salvar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.atualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PutMapping("/{id}/senha")
    public Usuario atualizarSenha(@PathVariable Long id, @RequestBody String novaSenha) {
        Usuario usuario = service.buscarPorId(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setSenha(novaSenha);
        return service.salvar(usuario);
    }
}
