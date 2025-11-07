const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(["test", "dev", "default"]).default("default"),
  PORT: z.coerce.number().default(4000),
  INTERNAL_SECRET_KEY: z.string(),
  JWT_SECRET: z.string(),
});

const _envSchema = envSchema.safeParse(process.env);

if (!_envSchema.success) {
  throw new Error(`Error on env file ${_envSchema.error}`);
}

module.exports = {
  _env: _envSchema.data,
};
