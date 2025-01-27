drop table if exists users;
drop table if exists profiles;
drop table if exists oauth2_authorization_consent;
drop table if exists spring_session_attributes;
drop table if exists spring_session;
drop table if exists oauth2_authorization;
drop table if exists oauth2_registered_client;

drop sequence if exists hibernate_sequence;

create sequence hibernate_sequence start with 1 increment by 1;

create table profiles
(
    id         bigint auto_increment primary key,
    name       varchar(255),
    created_at timestamp with time zone default current_timestamp
);

create table users
(
    id            bigint auto_increment primary key,
    name          varchar(100) not null,
    username      varchar(50) not null,
    document      varchar(255) not null unique,
    email         varchar(100) not null unique,
    password      varchar(255) not null,
    active        boolean not null,
    address       varchar(255),
    phone_number  varchar(20),
    profile_id    bigint not null,
    created_at    timestamp with time zone default current_timestamp,
    updated_at    timestamp with time zone default current_timestamp
);

alter table users
    add constraint fk_users_profile
        foreign key (profile_id) references profiles(id);

alter table users
    add constraint uk_5171l57faosmj8myawaucatdw unique (email);
alter table users
    add constraint fk9po12ytp6krwvwht1kmd0qgxf foreign key (profile_id) references profiles;

-- tabela spring_session
-- esta tabela armazena informações básicas sobre cada sessão, como o id da sessão, a data de criação, a última vez que foi acessada e a data de expiração
create table spring_session
(
    primary_id            char(36) not null,
    session_id            char(36) not null,
    creation_time         bigint   not null,
    last_access_time      bigint   not null,
    max_inactive_interval int      not null,
    expiry_time           bigint   not null,
    principal_name        varchar(100),
    constraint spring_session_pk primary key (primary_id)
);

drop index if exists spring_session_ix1;
create unique index spring_session_ix1 on spring_session (session_id);
drop index if exists spring_session_ix2;
create index spring_session_ix2 on spring_session (expiry_time);
drop index if exists spring_session_ix3;
create index spring_session_ix3 on spring_session (principal_name);

-- tabela spring_session_attributes
-- esta tabela armazena os atributos associados a cada sessão. cada atributo é armazenado como um par chave-valor, vinculado ao id da sessão correspondente
create table spring_session_attributes
(
    session_primary_id char(36)      not null,
    attribute_name     varchar(200)  not null,
    attribute_bytes    longvarbinary not null,
    constraint spring_session_attributes_pk primary key (session_primary_id, attribute_name),
    constraint spring_session_attributes_fk foreign key (session_primary_id) references spring_session (primary_id) on delete cascade
);

-- tabela oauth2_authorization
-- armazena informações sobre autorizações oauth2 concedidas. contém dados sobre tokens de acesso, tokens de atualização, códigos de autorização, etc.
create table oauth2_authorization
(
    id                            varchar(100) not null,
    registered_client_id          varchar(100) not null,
    principal_name                varchar(200) not null,
    authorization_grant_type      varchar(100) not null,
    authorized_scopes             varchar(1000) default null,
    attributes                    blob          default null,
    state                         varchar(500)  default null,
    authorization_code_value      blob          default null,
    authorization_code_issued_at  timestamp     default null,
    authorization_code_expires_at timestamp     default null,
    authorization_code_metadata   blob          default null,
    access_token_value            blob          default null,
    access_token_issued_at        timestamp     default null,
    access_token_expires_at       timestamp     default null,
    access_token_metadata         blob          default null,
    access_token_type             varchar(100)  default null,
    access_token_scopes           varchar(1000) default null,
    oidc_id_token_value           blob          default null,
    oidc_id_token_issued_at       timestamp     default null,
    oidc_id_token_expires_at      timestamp     default null,
    oidc_id_token_metadata        blob          default null,
    refresh_token_value           blob          default null,
    refresh_token_issued_at       timestamp     default null,
    refresh_token_expires_at      timestamp     default null,
    refresh_token_metadata        blob          default null,
    user_code_value               blob          default null,
    user_code_issued_at           timestamp     default null,
    user_code_expires_at          timestamp     default null,
    user_code_metadata            blob          default null,
    device_code_value             blob          default null,
    device_code_issued_at         timestamp     default null,
    device_code_expires_at        timestamp     default null,
    device_code_metadata          blob          default null,
    primary key (id)
);

-- tabela oauth2_registered_client
-- armazena informações sobre os clientes registrados que podem solicitar tokens de acesso. contém dados como o id do cliente, segredo do cliente, escopos, uris de redirecionamento, etc.
create table oauth2_registered_client
(
    id                            varchar(100)                            not null,
    client_id                     varchar(100)                            not null,
    client_id_issued_at           timestamp     default current_timestamp not null,
    client_secret                 varchar(200)  default null,
    client_secret_expires_at      timestamp     default null,
    client_name                   varchar(200)                            not null,
    client_authentication_methods varchar(1000)                           not null,
    authorization_grant_types     varchar(1000)                           not null,
    redirect_uris                 varchar(1000) default null,
    post_logout_redirect_uris     varchar(1000) default null,
    scopes                        varchar(1000)                           not null,
    client_settings               varchar(2000)                           not null,
    token_settings                varchar(2000)                           not null,
    primary key (id)
);

-- tabela oauth2_authorization_consent
-- armazena consentimentos de autorização dados pelos usuários. isso é importante para permitir que os usuários aprovem ou rejeitem permissões específicas solicitadas por um cliente.
create table oauth2_authorization_consent
(
    registered_client_id varchar(100)  not null,
    principal_name       varchar(200)  not null,
    authorities          varchar(1000) not null,
    primary key (registered_client_id, principal_name)
);
