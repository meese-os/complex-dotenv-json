const assert = require("assert");

const dotenvJSON = require("../index");

assert.ok(!process.env.hasOwnProperty("secret_api_key"));

// loads .env.json
dotenvJSON({ path: "tests/.env.json" });

// test simple properties
assert.ok(process.env.hasOwnProperty("secret_api_key"));
assert.equal(process.env.secret_api_key, "s@Mpl3_d@Ta_SECRET");
console.log("✔ basic environment variables loaded");

// test nested properties
assert.ok(process.env.hasOwnProperty("database"));
const database = JSON.parse(process.env.database);
assert.ok(database.hasOwnProperty("password"));
assert.equal(database.password, "postgres");
console.log("✔ nested environment variables stored as JSON");

// loads JSON file that includes comment lines
delete process.env.feature_flags;
delete process.env.website_url;
dotenvJSON({ path: "tests/.env.comments.json" });

assert.ok(process.env.hasOwnProperty("feature_flags"));
const featureFlags = JSON.parse(process.env.feature_flags);
assert.equal(featureFlags.beta, true);
assert.equal(process.env.website_url, "https://example.com/login");
console.log("✔ comment-stripping logic applied correctly");

console.log("All tests passed");
