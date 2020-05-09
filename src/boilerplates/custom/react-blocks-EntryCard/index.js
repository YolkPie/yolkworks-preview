export default async () => {
  const [htmlCode, jsCode, cssCode] = await Promise.all([
    import('!raw-loader!./codepan.html'),
    import('!raw-loader!./codepan.js'),
    import('!raw-loader!./index.css'),
  ])

  return {
    js: {
      code: jsCode,
      transformer: 'vue-jsx'
    },
    html: {
      code: htmlCode,
      transformer: 'html'
    },
    css: {
      code: cssCode,
      transformer: 'css'
    },
    showPans: ['html', 'js', 'output', 'css']
  }
}
