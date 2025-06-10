package com.fotografia.controller;

import com.fotografia.model.Usuario;
import com.fotografia.repository.UsuarioRepository;
import com.fotografia.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");

        System.out.println("➡️ Login recebido:");
        System.out.println("   📧 E-mail: " + email);
        System.out.println("   🔒 Senha: " + senha);

        try {
            System.out.println("🔐 Tentando autenticar...");

            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, senha)
            );

            System.out.println("✅ Autenticação bem-sucedida!");

            Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> {
                System.out.println("❌ Erro: Usuário não encontrado no banco de dados.");
                return new RuntimeException("Usuário não encontrado");
            });

            System.out.println("👤 Usuário encontrado:");
            System.out.println("   🆔 ID: " + usuario.getId());
            System.out.println("   👤 Nome: " + usuario.getNome());
            System.out.println("   📧 Email: " + usuario.getEmail());
            System.out.println("   🛡️ Perfil: " + usuario.getPerfil());

            String token = jwtUtil.generateToken(usuario);
            System.out.println("🔑 Token gerado: " + token);

            return ResponseEntity.ok(Map.of(
                "token", token,
                "nome", usuario.getNome(),
                "email", usuario.getEmail(),
                "perfil", usuario.getPerfil()
            ));
        } catch (Exception e) {
            System.out.println("🚫 Erro ao autenticar:");
            e.printStackTrace();
            return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas"));
        }
    }
}
