const { PORT = 5000, DATABASE_URL } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
