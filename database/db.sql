CREATE DATABASE test;

CREATE TABLE Category(
    c_id SERIAL PRIMARY KEY,
    c_name TEXT NOT NULL
    -- p_id INTEGER NOT NULL REFERENCES Product(p_id)
);

CREATE TABLE Product(
    p_id SERIAL PRIMARY KEY,
    p_name TEXT NOT NULL,
    p_price INTEGER NOT NULL,
    p_description TEXT,
    p_photo TEXT,
    p_composition TEXT NOT NULL,
    p_category INTEGER REFERENCES Category(c_id)
);

CREATE TABLE ProductCategory(
    p_id INTEGER NOT NULL REFERENCES Product(p_id),
    c_id INTEGER NOT NULL REFERENCES Category(c_id)
);


CREATE TABLE usuario(
    u_id SERIAL PRIMARY KEY,
    u_username TEXT NOT NULL,
    u_email TEXT NOT NULL UNIQUE,
    u_photo TEXT,
    u_rol TEXT NOT NULL,
    u_password TEXT NOT NULL
);