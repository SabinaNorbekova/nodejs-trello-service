CREATE DATABASE trello_project;

CREATE TABLE user(
    id SERIAL PRIOMARY KEY ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE board(
    ID SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    columns TEXT []
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    user_id INTEGER REFERENCES user(id),
    board_id INTEGER REFERENCES board(id),
    column_id INTEGER
)