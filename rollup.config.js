import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import packageJson from "./package.json";

export default [
  // Modern ESM + CJS Build
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      nodeResolve(),
      commonjs(),
      terser(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: packageJson.styles,
        modules: false,
        minimize: true,
        plugins: [require("tailwindcss"), require("autoprefixer")],
      }),
      babel({
        presets: [
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
    external: ["react", "react-dom"],
  },

  // Legacy UMD Build for Vanilla JS + jQuery
  {
    input: "src/index.ts",
    output: {
      file: packageJson.browser,
      format: "umd",
      name: "CreditScoreSdk",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      terser(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: packageJson.styles,
        minimize: true,
        plugins: [require("tailwindcss"), require("autoprefixer")],
      }),
      babel({
        presets: [
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              targets: "defaults, ie 11",
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
    external: ["react", "react-dom"],
  },

  // Type Definitions
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts()],
    external: [/\.(css|less|scss|sass)$/],
  },
];
