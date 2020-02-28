const request = require('./request');
const { orgName } = require('../../../config');

class Git {
  constructor() {
    this.orgName = orgName;
  }

  /**
   * 获取项目组中的项目模板列表
   */
  getProjectList() {
    return request(`/users/${this.orgName}/repos`);
  }
}

module.exports = Git;
