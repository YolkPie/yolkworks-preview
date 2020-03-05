const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * 清除模板字符串的换行符
 * @param html
 * @returns {void | string | *}
 */
const clearEnter = function (html) {
  return html.replace(/[\r\n]/g, '${{{{enter}}}}')
}

/**
 * 恢复换行符并删除空行
 * @param {*} text 
 */
const recoverEnter = function (text) {
  return text.replace(/\${{{{enter}}}}/g, '\n').replace(/\n(\n)*( )*(\n)*\n/g, '\n')
}

/**
 * 根据路径／文件名称／格式获取文件内容
 * @param dir
 * @param fileName
 * @param fileType
 * @returns {string|*}
 */
const getFileContent = function (dir, fileName, fileType) {
  const files = glob.sync(`${dir}/${fileName}.${fileType}`)
  if (files && files.length) {
    return fs.readFileSync(`${dir}/${fileName}.${fileType}`).toString()
  }
  return ''
}

/**
 * 获取模板内容（以index命名）
 * @param tempDir
 * @param fileType
 * @returns {string|*}
 */
const getTempFileContent = function (tempDir, fileType) {
  return getFileContent(`${tempDir}/src/`, 'index', fileType)
}

/**
 * 获取vue文件中template中间的内容
 * @param text
 * @returns {string|*}
 */
const extractTemplateFromText = function (text) {
  const reg = /(?<=<template>).+(?=<\/template>)/;
  const result = text.match(reg);
  if (result && result.length > 0) {
    return result[0]
  }
  return ''
}
/**
 * 获取vue文件中style中间的内容
 * @param text
 * @returns {string|*}
 */
const extractCssFromText = function (text) {
  const reg = /(?<=<style.*>).+(?=<\/style>)/;
  const result = text.match(reg);
  if (result && result.length > 0) {
    return result[0]
  }
  return ''
}

/**
 * 获取vue文件中js的内容
 * @param text
 * @returns {string|*}
 */
const extractJsFromText = function (text) {
  const reg = /(?<=<script>).+(?=<\/script>)/;
  const result = text.match(reg);
  if (result && result.length > 0) {
    const reg1 = /(?<=export default {).+(?=})/
    const result1 = result[0].match(reg1)
    if (result1 && result1.length) {
      return result1[0]
    }
  }
  return ''
}

const extractDataFromJs = function (jsText) {
  const reg = /(?<=name:'EntryCard',data(){return{).+(?=})/;
  const result = jsText.replace(/\s+/g, '').match(reg);
  if (result && result.length > 0) {
    return result[0]
  }
  return ''
}
/**
 * 从package.json中获取依赖
 * @param pkgDir
 */
const extractLibraryFromPkg = function (pkgDir) {
  const pkg = require(`${pkgDir}/package.json`)
  const dependencies = pkg.dependencies
  let scriptText = ''
  if (dependencies) {
    Object.keys(dependencies).forEach(dependency => {
      // 以@开头的组织不能确定都能访问到，暂时过滤
      if (dependency.indexOf('@') === -1) {
        //todo: 版本号待完善
        scriptText += `<script src="${'https://unpkg.com/' + dependency}"></script>`
      }
    })
  }
  return scriptText
}

/**
 * 创建文件到custom文件夹下
 * @param dirName 
 * @param fileName 
 * @param content 
 */
const writeCustomFile = function (dirName, fileName, content) {
  const dirPath = path.resolve(__dirname, `../../boilerplates/custom/${dirName}`)
  const customDirPath = path.resolve(__dirname, `../../boilerplates/custom`)
  if (!fs.existsSync(customDirPath)) {
    fs.mkdirSync(customDirPath)
  }
  const write = function () {
    fs.writeFileSync(`${dirPath}/${fileName}`, content);
  }
  if (fs.existsSync(dirPath)) {
    write()
  } else {
    fs.mkdirSync(dirPath)
    write()
  }
}

const vueConfig = {
  files: ['vue', 'js', 'css','scss', 'less', 'sass'],
  templates: {
    codepanHtml: getFileContent(path.join(__dirname, '../templates/vue'),'index.html', 'text'),
    indexJs: getFileContent(path.join(__dirname, '../templates/vue'), 'index.js', 'text'),
    codepanJS: getFileContent(path.join(__dirname, '../templates/vue'), 'codepan.js', 'text')
  }
}

const reactConfig = {
  files: ['jsx', 'css', 'scss', 'less', 'sasss'],
  templates: {
    codepanHtml: getFileContent(path.join(_dirname, '../templates/react', 'codepan.html', 'text')),
    indexJs: getFileContent(path.join(_dirname, '../templates/react', 'index.js', 'text')),
    codepanJs: getFileContent(path.join(_dirname, '../templates/react', 'codepan.js', 'text'))
  }
}


/**
 * 根据模板名称转换文件
 * @param name
 */
const transFileByTempName = function (name) {
  const tempDir = path.join(__dirname, `../../templateComponents/${name.replace(/-/g, '/')}`)
  const arr = name.split('-')
  const type = arr[0]
  const materialType = arr[1]
  const tempName = arr[2]
  const dirName = `${type}-${materialType}-${tempName}`
  if (type === 'vue') {
    vueConfig.files.forEach(fileType => {
      // 获取模板文件夹中的文件（均以index命名）
      const fileContent = clearEnter(getTempFileContent(tempDir, fileType))
      let cssContent = '' // css内容来源于vue文件中style标签及index.css
      if (fileContent && fileContent.length) {
        if (fileType === 'vue') {
          // 写入codepan.html
          // 1. 获取vue格式文件中template的内容
          const template = extractTemplateFromText(fileContent)
          // 2. 获取package.json中所需要的依赖，作为script标签添加
          const scripts = extractLibraryFromPkg(tempDir)
          if (template && template.length) {
            writeCustomFile(dirName, 'codepan.html', recoverEnter(vueConfig.templates.codepanHtml.replace('${template}', template).replace('${scripts}', scripts)))
          }

          // todo: 获取vue格式中style的内容
          // const css = extractCssFromText(fileContent)

          // 写入codepan.js
          const js = extractJsFromText(fileContent)
          writeCustomFile(dirName, 'codepan.js', recoverEnter(vueConfig.templates.codepanJS.replace('${content}', js)))

        } else if (fileType === 'css') {
          cssContent += fileContent
        } else if (fileType === 'less' || fileType === 'scss' || fileType === 'sass') {
          // todo: 暂时未考虑
        }
        // 写入css文件
        writeCustomFile(dirName, 'index.css', recoverEnter(fileContent))

        // 写入index.js配置
        writeCustomFile(dirName, 'index.js', recoverEnter(vueConfig.templates.indexJs))
      }
    })
  } else if (type === 'react') {
    reactConfig.files.forEach(fileType => {
      // 获取模板文件夹中的文件（均以index命名）
      const fileContent = clearEnter(getTempFileContent(tempDir, fileType))
      let cssContent = '' // css内容来源于vue文件中style标签及index.css
      if (fileContent && fileContent.length) {
        if (fileType === 'jsx') {
          // 写入codepan.html
          // 1. 获取jsx格式文件中template的内容
          const template = extractTemplateFromText(fileContent)
          // 2. 获取package.json中所需要的依赖，作为script标签添加
          const scripts = extractLibraryFromPkg(tempDir)
          if (template && template.length) {
            writeCustomFile(dirName, 'codepan.html', recoverEnter(vueConfig.templates.codepanHtml.replace('${template}', template).replace('${scripts}', scripts)))
          }

          // todo: 获取vue格式中style的内容
          // const css = extractCssFromText(fileContent)

          // 写入codepan.js
          const js = extractJsFromText(fileContent)
          writeCustomFile(dirName, 'codepan.js', recoverEnter(vueConfig.templates.codepanJS.replace('${content}', js)))

        } else if (fileType === 'css') {
          cssContent += fileContent
        } else if (fileType === 'less' || fileType === 'scss' || fileType === 'sass') {
          // todo: 暂时未考虑
        }
        // 写入css文件
        writeCustomFile(dirName, 'index.css', recoverEnter(fileContent))

        // 写入index.js配置
        writeCustomFile(dirName, 'index.js', recoverEnter(vueConfig.templates.indexJs))
      }
    })
  }
}

module.exports = transFileByTempName



