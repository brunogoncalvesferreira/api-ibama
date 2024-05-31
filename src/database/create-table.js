import { sql } from './db.js'

sql`
  create table if not exists images (
    id text primary key,
    url text,
    created_at timestamp default current_timestamp
  )
`.then(() => console.log('table created'))

sql`
  create table if not exists users (
    id text primary key,
    name text,
    email text,
    password text,
    created_at timestamp default current_timestamp
  )
`.then(() => console.log('table created'))

// caso queira deletar a tabela
/* sql`DROP TABLE IF EXISTS users`.then(() => {
  console.log("Tabela deletada com sucesso")
}) */
