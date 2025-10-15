-- ./database/queries.sql
CREATE DATABASE trello_project;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  columns TEXT[],
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    board_id UUID REFERENCES boards (id) ON DELETE CASCADE,
    column_id INTEGER
);