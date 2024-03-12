module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true, // اصلاح: es2020 به es2022 تغییر یافته است
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 2022, // اصلاح: 'latest' به 2022 تغییر یافته است
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // اصلاح: '18.2' به 'detect' تغییر یافته است
    },
  },
  plugins: ['react', 'react-hooks'], // اصلاح: 'react-refresh' حذف شده است
  rules: {
    'react/react-in-jsx-scope': 'off', // اصلاح: حذف قاعده غیر لازم
    'react/jsx-uses-react': 'off', // اصلاح: حذف قاعده غیر لازم
    'react/jsx-uses-vars': 'warn', // اصلاح: قاعده به warn تغییر یافته است
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        map: [
          ["@src", "./src"],
          ["@assets", "./assets"]
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
    react: {
      version: "latest"
    }
  },
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
}