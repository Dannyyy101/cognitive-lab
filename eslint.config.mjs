import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow variables prefixed with _ to be unused
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Ignore unused arguments starting with _
          varsIgnorePattern: "^_", // Ignore unused variables starting with _
          caughtErrorsIgnorePattern: "^_", // Ignore unused caught errors starting with _
        },
      ],
      // Other custom rules
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];

export default eslintConfig;
