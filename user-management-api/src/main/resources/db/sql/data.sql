insert into profiles (name, created_at)
values ('ADMIN', current_timestamp),
       ('USER',current_timestamp);

insert into users (name, username, document, email, password, active, address, phone_number, profile_id, created_at)
values
       ('Administrador', 'admin', '123.456.789-09', 'admin@exemplo.com', '$2a$12$mhWIAh5ch5.Qv/f10C.lc.U/Es8RR7PdmzGJylXePe.GVnqH2t9/2', true, 'Rua Principal, 123', '(11) 98765-4321', 1, current_timestamp),
       ('Usuário Comum', 'usuario', '98.765.432/0001-09', 'usuario@exemplo.com', '$2a$12$mhWIAh5ch5.Qv/f10C.lc.U/Es8RR7PdmzGJylXePe.GVnqH2t9/2', true, 'Rua Secundária, 456', '(11) 91234-5678', 2, current_timestamp);
