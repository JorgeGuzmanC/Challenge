CREATE DATABASE postdb;

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO post(name,description) VALUES
    ('post 1', 'descripcion post 1'),
    ('post 2', 'descripcion post 2');

SELECT * FROM post;