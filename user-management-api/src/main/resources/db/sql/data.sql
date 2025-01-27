insert into profiles (name, created_at)
values ('ADMIN', current_timestamp),
       ('USER',current_timestamp);

insert into users (name, email, password, profile_id, created_at)
values ('Administrador', 'admin@exemplo.com', '$2a$12$mhWIAh5ch5.Qv/f10C.lc.U/Es8RR7PdmzGJylXePe.GVnqH2t9/2', 1,
        current_timestamp),
       ('Usuário Comun', 'usuario@exemplo.com', '$2a$12$mhWIAh5ch5.Qv/f10C.lc.U/Es8RR7PdmzGJylXePe.GVnqH2t9/2', 2,
        current_timestamp);
