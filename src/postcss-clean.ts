import * as postcss from 'postcss'
// ESM import of clean-css breaks test/runtime check this fix for reference:
// https://github.com/vuejs/vue-component-compiler/pull/103#issuecomment-632676899
const CleanCSS = require('clean-css')

const postcssPluginClean = (options = {}) => {
  const clean = new CleanCSS({ compatibility: 'ie9', ...options })

  return {
    postcssPlugin: 'clean',
    // @ts-ignore
    Once (root, { result }) {
      const output = clean.minify(root.toString())

      result.css = postcss.parse(output.styles)
    }
  }
};
postcssPluginClean.postcss = true;

export default postcssPluginClean;
