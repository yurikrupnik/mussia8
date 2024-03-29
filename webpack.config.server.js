/* eslint-disable */
/* ts-ignore */

const webpack = require("webpack");
const path = require("path");
const noop = require("lodash/noop");
const nodeExternals = require("webpack-node-externals");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const SwaggerJSDocWebpackPlugin = require("swagger-jsdoc-webpack-plugin");

const filename = "server.js";
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
                    openapi: "3.0.1",
                    info: {
                        title: json.name,
                        version: json.version,
                        description: json.description
                    }
                },
                apis: ["./src/api/*.ts"]
            }),
            isWatch
                ? new NodemonPlugin({
                      script: path.resolve(cwd, "dist", filename),
                      watch: path.resolve(cwd, "dist", filename),
                      verbose: true
                  })
                : noop
        ]
    };
};
