package com.fotografia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "login"; // Isso vai procurar um arquivo chamado login.html em /resources/templates
    }
}
