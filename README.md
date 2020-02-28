# CodePan

[![CircleCI](https://circleci.com/gh/egoist/codepan/tree/master.svg?style=shield&circle-token=e811a08d6464123dd65d2dcd52f62806bf9e37fc)](https://circleci.com/gh/egoist/codepan/tree/master) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

Play with JS/CSS/HTML so simple it hurts, the web playground that works offline.

## Why

> Aren't there already JSBin/CodePen/JSFiddle?

Yep! So why not one more? And this one could work **offline** for you!

How? `codepan` is just a single page app with **no-backend**! Built with Webpack and Vue.js, and the offline feature is provided by [offline-plugin](https://github.com/NekR/offline-plugin).

## Browser Support

We aim to support latest version of Chrome, Safari, Firefox and Microsoft Edge.

## Development

Clone this repository and install dependencies by running `yarn`, then:

- `yarn dev`: Run in development mode
- `yarn build`: Build in production mode
- `yarn lint`: Run eslint

## License

MIT &copy; [EGOIST](https://github.com/egoist)


## TODO
- transFiles.js中换行的兼容性（vue codepan.js模板不能有空格和换行）
- transFiles.js中抽取依赖时@iceDesign的没办法处理，依赖版本号逻辑未添加
- transFiles.js中css仅考虑了index.css, vue模板中的css及scss等格式后续补充，还需添加到index.js作为配置项显示css/scss
