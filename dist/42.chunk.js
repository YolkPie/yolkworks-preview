webpackJsonp([42],{139:/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/boilerplates/custom/vue-blocks-SubTitle/index.css ***!
  \*****************************************************************************************//*! dynamic exports provided *//*! all exports used */function(a){a.exports="<template>\n  <div class=\"house-title row-center-start\">\n    <h3 class=\"house-title__text\">\n      <span class=\"house-title__split\"></span>\n      <span class=\"house-title__title-text\">{{title}}</span>\n    </h3>\n    <div\n      class=\"house-title__btn row-center\"\n      v-if=\"isShowHandleBtn\"\n      @click=\"clickTitleHandleBtn\"\n    >\n      <span style=\"line-height: .3rem\">{{handleBtnText}}</span>\n      <i class=\"house-title__btn-arrow\"></i>\n    </div>\n  </div>\n</template>\n<script>\n\texport default {\n\t\tprops: {\n\t\t\ttitle: { // \u5B50\u6807\u9898\u7684\u5185\u5BB9\n\t\t\t\ttype: String,\n\t\t\t\trequired: true\n\t\t\t},\n\t\t\tisShowHandleBtn: { // \u662F\u5426\u5C55\u793A\u64CD\u4F5C\u6309\u94AE\n\t\t\t\ttype: Boolean,\n\t\t\t\tdefault: false\n\t\t\t},\n\t\t\thandleBtnText: { // \u64CD\u4F5C\u6309\u94AE\u540D\u79F0\n\t\t\t\ttype: String,\n\t\t\t\tdefault: '\u8BE6\u60C5'\n\t\t\t},\n\t\t},\n\t\tmethods: {\n\t\t\tclickTitleHandleBtn() {\n\t\t\t\tthis.$emit('clickTitleHandleBtn')\n\t\t\t}\n\t\t}\n\t}\n</script>\n<style lang=\"scss\" scoped>\n  .row-center-start {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n  }\n  .row-center {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n  }\n  .house-title {\n    position: relative;\n    padding-left: .3rem;\n    width: 100%;\n    height: 1.04rem;\n    background-color: #fff;\n    box-sizing: border-box;\n    &__text {\n      flex: 1;\n      line-height: normal;\n      font-size: .3rem;\n      color: #424854;\n      font-weight: bold;\n    }\n    &__split {\n      display: inline-block;\n      vertical-align: middle;\n      margin-right: .02rem;\n      width: .06rem;\n      height: .28rem;\n      background-color: #424854;\n    }\n    &__title-text {\n      display: inline-block;\n      vertical-align: middle;\n    }\n    &__btn {\n      padding: 0 .3rem;\n      height: 100%;\n      line-height: normal;\n      font-size: .26rem;\n      color: #848689;\n    }\n    &__btn-arrow {\n      padding-left: .08rem;\n      width: .14rem;\n      height: .22rem;\n      background: url(../../../assets/img/common/light_gray_right_arrow.png) no-repeat right center/contain;\n    }\n  }\n</style>\n"}});