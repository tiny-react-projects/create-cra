const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// __dirname =>  /Users/yunajoe/Desktop/csr

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js, .jsx 파일에 적용
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i, // .css 파일 처리
        use: ["style-loader", "css-loader"], // 순서 중요: css-loader 먼저 → style-loader
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    port: 1234,
    hot: true,
  },
};
