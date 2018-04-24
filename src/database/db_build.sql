BEGIN;

DROP TABLE IF EXISTS users,lisTodo,role CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  bio TEXT NOT NULL,
  hashPassword TEXT NOT NULL
);

CREATE TABLE lisTodo(
  id SERIAL PRIMARY KEY,
 todoItem TEXT NOT NULL,
 done BOOLEAN NOT NULL,
  userId  INTEGER REFERENCES users(id) NOT NULL
);

CREATE TABLE role(
  roleID INTEGER PRIMARY KEY,
  type VARCHAR(10) NOT NULL,
  userId  INTEGER REFERENCES users(id) NOT NULL
);

INSERT INTO users(name , bio ,hashPassword)
 VALUES
 ('sallam' , 'sallam from Palestine' , '$2a$10$8sx3//7rhdQT3WMLCsZaRelS9AJGrM6EuVsry611q43l8fM4Jhjuq'),
 ('Balsam' , 'Balsam from Palestine' , '$2a$10$6UEoiSGXR3i6AEp3UW8ASeimQ6IwUD1.RhHzunEeRxgPo1aUjVGn.');


 INSERT INTO lisTodo(todoItem ,done,userId)
  VALUES
  ('item1' , true , 1),
  ('item3' , true , 2),
  ('item2' , false , 1),
  ('item4' , false , 2);

  INSERT INTO role(roleID , type ,userId)
   VALUES
   (1 , 'admin' , 2),
   (2 , 'user' , 1);
COMMIT;
