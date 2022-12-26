const { ESLint } = require("eslint");
const path = require("path");

const eslint = new ESLint();

module.exports = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => {
    const escapedFileNames = filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ");
    return [
      `prettier --write ${escapedFileNames}`,
      `eslint --no-ignore --max-warnings=0 --fix ${filenames
        .filter((file) => !eslint.isPathIgnored(file))
        .map((f) => `"${f}"`)
        .join(" ")}`,
      `git add ${escapedFileNames}`,
    ];
  },
  "**/*.{json,md,mdx,css,html,yml,yaml,scss}": (filenames) => {
    const escapedFileNames = filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ");
    return [
      `prettier --with-node-modules --ignore-path .prettierignore_staged --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ];
  },
};
