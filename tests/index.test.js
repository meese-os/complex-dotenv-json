const assert = require("assert");

const dotenvJSON = require("../index");

assert.ok(!process.env.hasOwnProperty("secret_api_key"));

// loads .env.json
dotenvJSON({ path: "tests/.env.json" });

// test simple properties
assert.ok(process.env.hasOwnProperty("secret_api_key"));
assert.equal(process.env.secret_api_key, "s@Mpl3_d@Ta_SECRET");

// test nested properties
assert.ok(process.env.hasOwnProperty("database"));
const database = JSON.parse(process.env.database);
assert.ok(database.hasOwnProperty("password"));
assert.equal(database.password, "postgres");
