# yolkworks-preview
  yolkworks 模板预览项目，基于[codepan](https://github.com/egoist/codepan)

## 安装
- `yarn`

## 开发与编译
- 开发环境: `yarn dev`
- 生产环境: `yarn build`
- 执行elsint: `yarn lint`


## TODO
- transFiles.js中换行的兼容性（vue codepan.js模板不能有空格和换行）
- transFiles.js中抽取依赖时@iceDesign的没办法处理，依赖版本号逻辑未添加
- transFiles.js中css仅考虑了index.css, vue模板中的css及scss等格式后续补充，还需添加到index.js作为配置项显示css/scss
