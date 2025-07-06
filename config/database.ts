import env from '#start/env'
// reads from your .env file.
import { defineConfig } from '@adonisjs/lucid'
//defineConfig() is a helper to define Lucid’s database configuration.
const dbConfig = defineConfig({
  connection: 'postgres',
  //Use the postgres connection by default (can also be 'mysql', 'sqlite', etc. depending on your setup).
  connections: {
    postgres: {
      client: 'pg',
      //client: 'pg' tells Lucid to use the PostgreSQL driver (pg is the Node.js library under the hood)
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      //Lucid will connect using these values to your PostgreSQL database.

      migrations: {
        naturalSort: true,      
        paths: ['database/migrations'],
        //Path where your migration files are located.
      },
    },
  },
})

export default dbConfig

// AdonisJS will automatically load and use this config during:
// node ace migration:run
// Model.create(), Model.find()
// Any database interaction via Lucid ORM