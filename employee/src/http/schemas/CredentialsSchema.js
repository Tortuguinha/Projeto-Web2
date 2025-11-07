const { z } = require("zod");

const emails = ["@lanhouse.com"];
const credentialsSchema = z.object({
  email: z
    .email()
    .min(1)
    .refine((email) => {
      return emails.some((domain) => email.endsWith(domain));
    }, "Email inválido"),
});

module.exports = { credentialsSchema };
