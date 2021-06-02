import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import esbuild from "rollup-plugin-esbuild";

const globals = {
    react: "React"
};

const defaultModule = {
    input: "src/index.ts",
    output: [
        {
            dir: "dist/cjs",
            format: "cjs",
            globals
        },
        {
            dir: "dist/esm",
            format: "esm",
            globals
        }
    ],
    plugins: [
        esbuild(),
        postcss({
            minimize: true,
            modules: true,
            plugins: [autoprefixer()]
        })
    ]
};

export default defaultModule;
