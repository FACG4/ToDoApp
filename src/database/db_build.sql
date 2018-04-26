BEGIN;

DROP TABLE IF EXISTS users,listTodo CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) UNIQUE NOT NULL,
  bio TEXT NOT NULL,
  hashPassword TEXT NOT NULL,
  role INTEGER
);

CREATE TABLE listTodo(
  id SERIAL PRIMARY KEY,
 todoItem TEXT NOT NULL,
 done BOOLEAN NOT NULL,
  userId  INTEGER REFERENCES users(id) NOT NULL
);

INSERT INTO users(name , bio ,hashPassword , role)
 VALUES
 ('admin' , 'the only admin' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',1),
 ('ooo' , 'tjjjjjjjj' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2),
 ('sahhhham' , 'tjjjjjjjj' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2),
 ('new user' , 'uuuuuuuuu' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2),
 ('BB' , 'balsam b' , '$2b$10$JVkylRMYoPOpBnFG72A.jezsnMSwhZh4S5CvwBspfa90lA9xy8BLa' ,2),
 ('Balsam' , 'Hi, this is Balsam!' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2),
 ('sallam' , 'Sallam from Palestine :)' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2);

   INSERT INTO listTodo(todoItem , done  , userId)
    VALUES
    ('new user list item' , true , 2),
    ('new user list item' , false , 2),
    ('new user list item' , true , 3),
    ('new user list item' , true , 3),
    ('new user list item' , true , 5),
    ('new user list item' , false , 5);

  COMMIT;
