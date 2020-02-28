const path = require('path');
const fs = require('fs');

// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(components, dir, curDir, deep) {
  let curPath = path.join(dir, curDir);
  // 达到搜索深度，停止
  if(deep) {
    if (curDir.toLowerCase().indexOf('package.json') !== -1) {
      // package.json文件,获取路径信息
      const folders = dir.split('\\').splice(-3)
      components.push(`${folders[0]}-${folders[1]}-${folders[2]}`)
    } else {
      // 排除指定文件
      const exceptions = ['readme', 'src', 'license']
      for (let i = 0; i < exceptions.length; i++) {
        if (curDir.toLowerCase().indexOf(exceptions[i]) !== -1) return
      }
    }
    if(fs.statSync(curPath).isDirectory()) {
      let lists = fs.readdirSync(curPath);
      lists.forEach(list => getIndexOfPathByDeep(components, curPath, list, deep - 1))
    }
  }

}

// 获取指定路径 path 下的，默认深度为 4 的目录 JSON
module.exports = function (dir, deep = 4) {
  let dirDevide = dir.split('/');
  let preDir = dirDevide.splice(0, dirDevide.length - 1).join('/');
  let components = []
  getIndexOfPathByDeep(components, path.join(__dirname, preDir), dirDevide[0], deep + 1);
  return components;
}
