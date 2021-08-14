'use strict';

module.exports = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
},
  plugins: [
    new VueLoaderPlugin(),
  ],
  mode: 'production',
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules|web_modules/,
      use: [{
        loader: 'babel-loader'
      }
    ]
    },
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            indentedSyntax: true // optional
          },
          // Requires >= sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
   ]
  }
};