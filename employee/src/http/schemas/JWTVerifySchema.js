const { z } = require("zod");

const jwtVerifySchema = z.object({
  accessToken: z.string().min(1, "Token é obrigatório")
})

module.exports = {
  jwtVerifySchema,
};
