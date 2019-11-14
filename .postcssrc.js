// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  loaders: [
    {
      test: /\.vue$/,
      loader: 'vue',
    },
    {
      test: /\.s[a|c]ss$/,
      loader: 'style!css!sass',
    }
  ],
  vue: {
    loaders: {
      scss: 'style!css!sass',
    },
  },
  sassOptions: {
    indentedSyntax: true,
  },
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  },
}
