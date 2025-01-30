import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";

const packageJson = require("./package.json");

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
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss(),
      babel({
        presets: [
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead", // Support modern browsers
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
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
      name: "CreditScoreSdk", // Global variable when loaded via <script>
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      babel({
        presets: [
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              targets: "defaults, ie 11", // Support older browsers (IE11+)
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
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
