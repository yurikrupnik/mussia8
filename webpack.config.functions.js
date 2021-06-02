/* eslint-disable */
/* ts-ignore */
// TODO finish module for function result
const webpack = require("webpack");
const path = require("path");
// const noop = require("lodash/noop");
const nodeExternals = require("webpack-node-externals");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
// const NodemonPlugin = require("nodemon-webpack-plugin");
const SwaggerJSDocWebpackPlugin = require("swagger-jsdoc-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
// const LoadablePlugin = require("@loadable/webpack-plugin");
// const { ESBuildPlugin } = require("esbuild-loader");

const filename = "index.js";
const cwd = process.cwd();
const json = require(path.resolve(cwd, "./package")); // eslint-disable-line
const entry = "./index.ts";

module.exports = (env, argv) => {
    const isWatch = !!argv.watch;
    return {
        context: path.resolve(cwd, "src"),
        resolve: {
            extensions: [".ts", ".tsx", ".json", ".js", ".jsx", ".css", ".scss"]
            // alias,
            // modules: [path.resolve(cwd), 'node_modules']
        },
        target: "node", // in order to ignore built-in modules like path, fs, etc.
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        // devtool: !isWatch ? "" : "eval-cheap-module-source-map",
        entry,
        output: {
            path: path.resolve(cwd, "dist"),
            // chunkFilename: "[name].js",
            filename
            // TODO MAKE IT WORK WITH WEBPACK, ROLLUP FAILING WITH SWAGGER DOCS IN DEV
        },
        mode: !isWatch ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js|jsx)?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: "tsx",
                        target: "esnext"
                    }
                }
            ]
        },
        plugins: [
            // new ESBuildPlugin({}),
            new webpack.EnvironmentPlugin({
                NODE_ENV: isWatch ? "development" : "production" // use 'development' unless process.env.NODE_ENV is defined
                // NODE_ENV: "production" // use 'development' unless process.env.NODE_ENV is defined
            }),
            // new LoadablePlugin(),
            new GenerateJsonPlugin("package.json", {
                ...json,
                main: filename,
                files: [],
                scripts: {
                    start: `node ${filename}`
                },
                devDependencies: {}
            }),
            new SwaggerJSDocWebpackPlugin({
                swaggerDefinition: {
                    swagger: "2.0",
                    info: {
                        title: "Title",
                        version: "1.0.0",
                        description: "Description"
                    }
                },
                apis: ["./src/index.ts"]
            })
            // new CopyPlugin({
            //     patterns: [{ from: path.join(cwd, "app.yml") }]
            // }),
        ]
    };
};
