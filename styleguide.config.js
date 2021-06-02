/* eslint-disable */

const webpack = require("webpack");
const path = require("path");

module.exports = {
    // serverPort: Number(process.env.npm_package_config_port),
    pagePerSection: true,
    sections: [
        {
            name: "Introduction",
            content: "docs/introduction.md"
        },
        // {
        //     name: "Documentation",
        //     sections: [
        //         {
        //             name: "Installation",
        //             content: "docs/installation.md",
        //             description: "The description for the installation section"
        //         },
        //         {
        //             name: "Configuration",
        //             content: "docs/configuration.md"
        //         },
        //         {
        //             name: "Live Demo",
        //             external: true,
        //             href: "https://perimeter81-next.vercel.app/"
        //         }
        //     ]
        // },
        {
            pagePerSection: true,
            name: "NPM packages",
            // content: "packages/**/README.md",
            components: "packages/ui/**/src/*.tsx",
            exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
            usageMode: "expand", // 'hide' | 'collapse' | 'expand'
            ignore: ["**/__tests__/*.tsx"]
        },
        {
            name: "Jarvis",
            // content: "docs/ui.md",
            components: "packages/webclients/alfred/components/**/*.tsx",
            exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
            usageMode: "expand", // 'hide' | 'collapse' | 'expand'
            ignore: ["**/__tests__/*.tsx"]
        },
        {
            name: "Webclient",
            // content: "docs/ui.md",
            components: "packages/webclients/alfred/components/**/*.tsx",
            exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
            usageMode: "expand", // 'hide' | 'collapse' | 'expand'
            ignore: ["**/__tests__/*.tsx"]
        },
        {
            name: "Typedoc", // todo fix for github pages url when prod/dev
            href: "http://localhost:63342/mussia7/docs/typedoc/index.html"
        },
        {
            name: "Swagger",
            href: "https://app.swaggerhub.com/organizations/mussia"
        }
        // {
        //     pagePerSection: true,
        //     sections: [
        //         {
        //             // name: json.name,
        //             // components: [path.join(cwd, "src/**/*.jsx")],
        //             components: "packages/jarvis/components/*.ts",
        //             content: path.join(cwd, "README.md"),
        //             // content: 'README.md',
        //             ignore: ["**/__tests__/*.jsx"]
        //         }
        //     ]
        // }
    ],
    // styleguideComponents: {
    //     // Wrapper: path.join(process.cwd(), 'StyleguidistMuiWrapper.jsx'),
    // },
    ignore: ["**/*.stories.jsx", "__mocks__/"],
    styleguideDir: "docs/",
    webpackConfig: {
        resolve: {
            extensions: [".json", ".js", ".jsx", ".css", ".scss"],
            alias: {
                react: path.resolve(__dirname, "./node_modules/react")
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: "process/browser"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js|jsx)?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: "tsx",
                        target: "esnext"
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        }
    }
};
