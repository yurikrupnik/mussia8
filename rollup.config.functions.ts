import path from "path";
import copy from "rollup-plugin-copy";
import esBuild from "rollup-plugin-esbuild";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swagger from "rollup-plugin-swagger-jsdoc"; // the module does not have ts config

const cwd = process.cwd();

const globals = {};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const defaultModule = (args) => {
    console.log("args", args); // eslint-disable-line
    return {
        input: "src/index.ts",
        output: {
            file: "dist/index.js",
            format: "cjs",
            globals
        },
        plugins: [
            !args.watch &&
                swagger({
                    // todo fails on watch when changing file
                    definition: {
                        // Specification (optional, defaults to swagger: '2.0')
                        swagger: "2.0",
                        info: {
                            // Title (required)
                            title: "My API",
                            // Version (required)
                            version: "1.0.0"
                        }
                    },
                    // Path to the API docs
                    apis: ["src/index.ts"],
                    // Pretty format output JSON
                    pretty: true,
                    // Output swagger.json file
                    output: "dist/swagger.json"
                }),
            esBuild({}),
            copy({
                targets: [{ src: path.join(cwd, "package.json"), dest: "dist" }]
            })
        ]
    };
};

export default defaultModule;
