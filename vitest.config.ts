import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [solid({hot:false})],
    test: {
        deps: {
            registerNodeLoader: true,
            inline: [/solid-js/],
        },
        environment: "jsdom",
        globals: true,
        setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect', './setupVitest.js'],
        transformMode: { web: [/\.[jt]sx?$/] },
    },
    resolve: {
        conditions: ["development", "browser"],
    },
});