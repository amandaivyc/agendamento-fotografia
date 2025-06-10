
-- Usuário ADMIN
INSERT INTO usuario (id, nome, email, senha, perfil) VALUES
(1, 'Admin', 'admin@fotografia.com', '$2a$10$uZrKkIxmV8BpoCQl9wCQAesGNPADH4BqDChjxYIz6TA/XYzKMUqM2', 'ADMIN'); -- senha: admin123

-- Usuário comum
INSERT INTO usuario (id, nome, email, senha, perfil) VALUES
(2, 'Amanda', 'amanda@fotografia.com', '$2a$10$JIHxGV8NOcN8fh6cU0IGUOWjSK8KHImcmZZsfVcFqGjM.lNk8cD6C', 'USUARIO'); -- senha: amanda123

-- Ensaios
INSERT INTO ensaio (id, nome, descricao, preco) VALUES
(1, 'Ensaio Gestante', 'Ensaio com gestantes em estúdio', 300.00),
(2, 'Ensaio Infantil', 'Ensaio para crianças até 10 anos', 200.00);

-- Campanhas
INSERT INTO campanha (id, titulo, descricao, ativa) VALUES
(1, 'Campanha Dia das Mães', 'Promoção especial para mães', true),
(2, 'Natal 2025', 'Campanha de natal com cenário exclusivo', true);

-- Agendamentos
INSERT INTO agendamento (id, cliente_nome, email, data_hora, tipo_ensaio, confirmado) VALUES
(1, 'Amanda', 'amanda@fotografia.com', '2025-06-10T15:00:00', 'Ensaio Gestante', true),
(2, 'Amanda', 'amanda@fotografia.com', '2025-06-20T10:00:00', 'Ensaio Infantil', false);
