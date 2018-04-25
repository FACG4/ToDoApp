BEGIN;

DROP TABLE IF EXISTS users,lisTodo CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) UNIQUE NOT NULL,
  bio TEXT NOT NULL,
  hashPassword TEXT NOT NULL,
  role INTEGER
);

CREATE TABLE lisTodo(
  id SERIAL PRIMARY KEY,
 todoItem TEXT NOT NULL,
 done BOOLEAN NOT NULL,
  userId  INTEGER REFERENCES users(id) NOT NULL
);




INSERT INTO users(name , bio ,hashPassword , role)
 VALUES
 ('admin' , 'the only admin' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',1);


 INSERT INTO users(name , bio ,hashPassword , role)
  VALUES
  ('ooo' , 'tjjjjjjjj' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2);

  INSERT INTO users(name , bio ,hashPassword , role)
   VALUES
   ('sahhhham' , 'tjjjjjjjj' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2);

   INSERT INTO users(name , bio ,hashPassword , role)
    VALUES
    ('new user' , 'uuuuuuuuu' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq',2);
-- select * from users;
  COMMIT;
--
--  INSERT INTO lisTodo(todoItem ,done,userId)
--   VALUES
--   ('item1' , true , 1),
--   ('item3' , true , 2),
--   ('item2' , false , 1),
--   ('item4' , false , 2);
--
--   INSERT INTO role(roleID , type ,userId)
--    VALUES
--    (1 , 'admin' , 2),
--    (2 , 'user' , 1);
