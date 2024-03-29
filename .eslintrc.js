module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-undef': 0,
    'no-shadow': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-script-url': 0,
    'no-restricted-syntax': 0,
    'no-unused-expressions': 0,
    'import/no-mutable-exports': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/static-property-placement': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/no-children-prop': 0,
    'jsx-a11y/aria-proptypes': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
};
