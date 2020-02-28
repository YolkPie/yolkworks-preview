const ora = require('ora')
const fse = require('fs-extra');
const { TEMP_PATH } = require('../../config')
const getTempList = require('./lib/getTempList')
const transFiles = require('./lib/transFiles')
const getComponents = require('./lib/getComponents')

class getTempListPlugin {
  apply (compiler) {
    this.ora = ora('获取模板列表中，请耐心等待。。。')
    this.hasLoaded = false
    const getList = (compilation, callback) => {
      if (this.hasLoaded) {
        if (this.loadingText) {
          this.loadingText.stop()
        }
        callback && callback()
        return
      }

      this.loadingText = this.ora.start()
      
      getTempList().then(() => {
        this.loadingText.succeed('获取模板列表完成')
        this.hasLoaded = true
      
        const plugins = compiler.options.plugins
        for (let i = 0; i < plugins.length; i++) {
          if (plugins[i] && plugins[i].definitions) {
            const components = getComponents('../../templateComponents')
            plugins[i].definitions['process.env.COMPONENTS_LIST'] = JSON.stringify(components)
            // 转换为符合boilplate显示要求的格式
            components.forEach(component => {
              transFiles(component)
            })
            fse.removeSync(TEMP_PATH)
          }
        }
        callback && callback()
      }).catch(error => {
        this.hasLoaded = true
        console.log(error);
        this.ora.stop()
      })
    }
    if (compiler.hooks) {
      compiler.hooks.beforeCompile.tap('GetTempListPlugin', getList)
    } else {
      compiler.plugin('before-compile', getList);
    }
  }
}

module.exports = getTempListPlugin

