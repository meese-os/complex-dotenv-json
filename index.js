const path = require("path");
const fs = require("fs");

module.exports = function dotenvJSON(options) {
  const jsonFile = (options && options.path) || ".env.json";

  const jsonString = fs.readFileSync(path.resolve(process.cwd(), jsonFile), {
    encoding: "utf8"
  });

  try {
    const cleanString = jsonString
      .split(/\r?\n/)
      .filter(line => !line.trim().startsWith("//"))
      .join("\n");

    const envConfig = JSON.parse(cleanString);

    for (const key in envConfig) {
      if (process.env.hasOwnProperty(key)) {
        process.env[key] = process.env[key];
      } else {
        const value = envConfig[key];
        if (value === Object(value)) {
          process.env[key] = JSON.stringify(value);
        } else {
          process.env[key] = value;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};
