module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', '@stylistic/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		// 'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': 0,
		'@stylistic/comma-dangle': ['error', 'always-multiline'],
		'@stylistic/quotes': ['error', 'single'],
		'@stylistic/semi': ['error', 'never'],
		'@stylistic/object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
		'@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'@stylistic/object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
		'@stylistic/key-spacing': ['error', { 'beforeColon': false }],
		'@stylistic/no-multi-spaces': 'error',
		'@stylistic/type-annotation-spacing': ['error', { 'before': false, 'after': true }],
		'@stylistic/rest-spread-spacing': ['error', 'never'],
		'@stylistic/array-bracket-spacing': ['error', 'never'],
		'@stylistic/eol-last': ['error', 'always'],
		'@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
		'@stylistic/indent': ['error', 2],
		'@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
		'space-infix-ops': ["error", { "int32Hint": false }],
		'@stylistic/arrow-parens': ['error', 'as-needed'],
		'@stylistic/type-annotation-spacing': ['error', { 'before': false, 'after': true, 'overrides': { 'arrow': { 'before': true, 'after': true } } }],
		'@typescript-eslint/no-unused-vars': 'warn',
	},
}