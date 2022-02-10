import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import banner2 from 'rollup-plugin-banner2'
import copy from 'rollup-plugin-copy'
import versionInjector from 'rollup-plugin-version-injector'
import json from '@rollup/plugin-json'

import packageJson from './package.json'

const DEV = process.env.NODE_ENV === 'dev' ? true : false

const devPlugins = [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    banner2(() => '/* eslint-disable */'),
    versionInjector(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
]

const prodPlugins = [terser(), ...devPlugins]

const devConfig = [{
        input: 'src/index.tsx',
        output: [{
            file: 'dev-example/src/component-lib/esm/index.js',
            format: 'esm',
        }, ],
        plugins: [
            ...devPlugins,
            // del({ targets: ['dev-example/src/component-lib/*'] }),
            copy({
                targets: [{
                    src: ['src/assets/**/*'],
                    dest: ['dev-example/src/component-lib/assets'],
                }, ],
            }),
        ],
        external: Object.keys(packageJson.peerDependencies || {}),
    },
    {
        input: 'dev-example/src/component-lib/esm/types/index.d.ts',
        output: [{
            file: 'dev-example/src/component-lib/esm/index.d.ts',
            format: 'esm',
        }, ],
        plugins: [
            dts(),
            del({
                hook: 'buildEnd',
                targets: ['dev-example/src/component-lib/esm/types'],
            }),
        ],
    },
]

const prodConfig = [{
        input: 'src/index.tsx',
        output: [{
                file: packageJson.main,
                format: 'cjs',
            },
            {
                file: packageJson.module,
                format: 'esm',
            },
        ],
        plugins: [
            ...prodPlugins,
            del({ targets: ['dist/*'] }),
            copy({
                targets: [{
                    src: ['src/assets/**/*'],
                    dest: ['dist/assets'],
                }, ],
            }),
        ],
        external: Object.keys(packageJson.peerDependencies || {}),
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [
            dts(),
            del({
                hook: 'buildEnd',
                targets: ['dist/esm/types', 'dist/cjs/types'],
            }),
        ],
    },
]

export default DEV ? devConfig : prodConfig

// export default [{
//         input: 'src/index.tsx',
//         output: [{
//                 file: packageJson.main,
//                 format: 'cjs',
//             },
//             {
//                 file: 'dev-example/src/component-lib/esm/index.js',
//                 format: 'esm',
//                 banner: '/* eslint-disable */',
//             },
//             {
//                 file: packageJson.module,
//                 format: 'esm',
//             },
//         ],
//         plugins: [
//             ...plugins,
//             typescript({ tsconfig: './tsconfig.json' }),
//             del({ targets: ['dist/*', 'dev-example/src/component-lib/*'] }),
//             copy({
//                 targets: [{
//                     src: ['src/assets/**/*'],
//                     dest: [
//                         'dist/assets',
//                         'dev-example/src/component-lib/assets',
//                     ],
//                 }, ],
//             }),
//         ],
//         external: Object.keys(packageJson.peerDependencies || {}),
//     },
//     {
//         input: 'dist/esm/types/index.d.ts',
//         output: [
//             { file: 'dist/index.d.ts', format: 'esm' },
//             {
//                 file: 'dev-example/src/component-lib/esm/index.d.ts',
//                 format: 'esm',
//             },
//         ],
//         plugins: [
//             dts(),
//             del({
//                 hook: 'buildEnd',
//                 targets: [
//                     'dist/esm/types',
//                     'dist/cjs/types',
//                     'dev-example/src/component-lib/esm/types',
//                 ],
//             }),
//         ],
//     },
// ]