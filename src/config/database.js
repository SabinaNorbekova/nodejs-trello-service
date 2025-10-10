import pg from "pg"

const {Pool}=pg

let pool=new Pool({
    host: 'localhost',
    database: 'trello_project',
    password: 'root',
    user: 'postgres',
    port:5432
})

export default pool