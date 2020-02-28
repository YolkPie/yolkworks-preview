const fse = require('fs-extra');
const getTarballUrl = require('./getTarballUrl')
const extractTarball = require('./extractTarball')
const Git = require('../tools/git')
const { TEMP_PATH } = require('../../../config')

module.exports = function (callback) {
  const extractPromises = []
  this.git = new Git()
  return new Promise((finalResolve, finalReject) => {
    this.git.getProjectList().then(repos => {
      // 获取git中模板库列表（以-materials结尾）
      repos.filter(({name}) => name.endsWith('materials')).forEach(repo => {
        const extractPromise = new Promise((resolve, reject) => {
          const tarballURL = getTarballUrl(repo.name)
          extractTarball({
            tarballURL,
            destDir: TEMP_PATH
          }).then(() => {
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
        extractPromises.push(extractPromise)
      })
      if (!extractPromises.length) {
        finalReject('模板列表为空哦')
        return
      }
      // 所有代码库文件下载完成后，根据目录结构，生成json文件
      Promise.all(extractPromises).then(() => {
        finalResolve()
      }).catch(error => {
        fse.removeSync(TEMP_PATH);
        console.log(error)
        finalReject(error)
      })
    }).catch(error => {
      finalReject(error)
    })
  })
}


