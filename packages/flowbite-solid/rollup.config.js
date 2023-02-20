// eslint-disable-next-line import/no-extraneous-dependencies
import withSolid from 'rollup-preset-solid';
import commonjs from '@rollup/plugin-commonjs';
const config = withSolid({
    input: 'src/index.ts',
    targets: ['esm', 'cjs'],
    plugins:[
     commonjs(), //for solid-icons
    ],
    printInstructions: true,
});

export default config;
