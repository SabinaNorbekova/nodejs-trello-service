-- ./database/queries.sql
CREATE DATABASE trello_project;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    columns TEXT[]
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
    column_id INTEGER
);
