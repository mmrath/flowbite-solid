import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: "src/lib/index.ts",
    output: [
        {
            file: "dist/esm/index.js",
            format: "es",
        },
    ],
    external: [
        "dom-helpers",
        "solid-bootstrap-core",
        "solid-js",
        "solid-icons",
        "solid-js/web",
        "solid-react-transition",
        "warning",
    ],
    plugins: [
        commonjs(),
        nodeResolve({
            extensions: [".js", ".ts", ".tsx"],
        }),
        babel({
            extensions: [".js", ".ts", ".tsx"],
            babelHelpers: "bundled",
            presets: ["solid", "@babel/preset-typescript"],
            exclude: "node_modules/**",
        }),
    ],
};
