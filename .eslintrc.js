module.exports = {
  extends: '@yieldstudio/eslint-config',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.base.json',
    tsconfigRootDir: __dirname,
  },
};
