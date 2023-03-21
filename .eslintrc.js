module.exports = {
  extends: '@yieldstudio/eslint-config',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
