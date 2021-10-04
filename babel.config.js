module.exports = {
  presets: [
    'backpack-core/babel',
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ]
};
