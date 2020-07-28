webpackJsonp([48],{133:/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/boilerplates/custom/vue-blocks-MapSurrounding/index.css ***!
  \***********************************************************************************************//*! dynamic exports provided *//*! all exports used */function(a){a.exports="<template>\n  <div class=\"house-location\">\n    <!--\u4E0D\u8981\u76F4\u63A5\u5728\u5730\u56FE\u76D2\u5B50\u4E0A\u901A\u8FC7@click\u8BBE\u7F6E\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u53EF\u80FD\u4F1A\u6267\u884C\u591A\u6B21\u70B9\u51FB\u4E8B\u4EF6-->\n    <!--\u76F4\u63A5\u7ED9\u6DFB\u52A0\u5730\u56FE\u70B9\u51FB\u4E8B\u4EF6-->\n    <div\n      class=\"map-box\"\n      id=\"map-box\"\n    ></div>\n    <div class=\"tab-box\">\n      <ul class=\"tab-ul flex-row\">\n        <li\n          class=\"tab-li flex-one\"\n          :class=\"{'selected-li': slectedIndex == index}\"\n          v-for=\"(item, index) in tabs\"\n          :key=\"'mapTab_'+index\"\n          @click=\"switchTab(item.name, index)\"\n        >{{item.name}}\n        </li>\n      </ul>\n      <div class=\"info-box\">\n        <ul class=\"info-ul border-bottom\" v-if=\"displayedPoiList && displayedPoiList.length\">\n          <li class=\"info-li\" v-for=\"(item, index) in displayedPoiList\" :key=\"'infoLi_'+index\">\n            <span class=\"label-name\">{{item.customLabelName}}</span>\n            <span class=\"info-details\">{{item.name}}</span>\n            <span class=\"distance\">{{item.customDist}}</span>\n          </li>\n        </ul>\n        <div class=\"no-info border-bottom\" v-else>\n          <p class=\"tip-info\">\u62B1\u6B49\uFF0C3\u516C\u91CC\u5185\u6CA1\u6709{{tabs[slectedIndex].name}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\n\timport TMap from './map'\n\texport default {\n\t\tprops: ['mapInfo', 'mapKey'],\n\t\tdata() {\n\t\t\treturn {\n\t\t\t\tmap: '',\n\t\t\t\tmarker: '',\n\t\t\t\ttabs: [\n\t\t\t\t\t{\n\t\t\t\t\t\tname: '\u516C\u4EA4',\n\t\t\t\t\t}, {\n\t\t\t\t\t\tname: '\u5730\u94C1',\n\t\t\t\t\t}, {\n\t\t\t\t\t\tname: '\u5546\u573A',\n\t\t\t\t\t}, {\n\t\t\t\t\t\tname: '\u5B66\u6821',\n\t\t\t\t\t}, {\n\t\t\t\t\t\tname: '\u533B\u9662',\n\t\t\t\t\t}, {\n\t\t\t\t\t\tname: '\u94F6\u884C',\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\tslectedIndex: 0,\n\t\t\t\taddressOverlay: null, // \u5730\u56FE\u4E0A\u7684\u4FE1\u606F\u8986\u76D6\u7269\n\t\t\t\tdisplayedPoiList: [] // \u5C55\u793A\u5728\u9875\u9762\u4E0A\u7684poi\u4FE1\u606F\n\t\t\t}\n\t\t},\n\t\tcreated() {\n\t\t\tthis.initMap()\n\t\t},\n\t\tactivated() {\n\t\t\tthis.initSearchService()\n\t\t},\n\t\tmethods: {\n\t\t\tinitMap() {\n\t\t\t\tconst { addressLat: lat, addressLon: lng, mapTitle, mapAddress } = this.mapInfo\n        const locationIconUrl = 'https://img13.360buyimg.com/imagetools/jfs/t1/122736/18/3158/1064/5ece1822E5338665c/ab2190c296ea5f01.png'\n\t\t\t\tTMap(this.mapKey || '').then(qq => {\n\t\t\t\t\tlet latLng = new qq.maps.LatLng(lat, lng)\n\t\t\t\t\tthis.map = new qq.maps.Map(document.getElementById(\"map-box\"), {\n\t\t\t\t\t\tcenter: new qq.maps.LatLng(lat + 0.0015, lng - 0.0025),\n\t\t\t\t\t\tzoom: 15,\n\t\t\t\t\t\tdraggable: false,\n\t\t\t\t\t\tscrollwheel: false,\n\t\t\t\t\t\tdisableDoubleClickZoom: false,\n\t\t\t\t\t\tzoomControl: false,\n\t\t\t\t\t\tpanControl: false,\n\t\t\t\t\t\tmapTypeControl: false\n\t\t\t\t\t})\n\t\t\t\t\tthis.marker = new qq.maps.Marker({\n\t\t\t\t\t\ticon: new qq.maps.MarkerImage(locationIconUrl, '', '', '', new qq.maps.Size(24, 32)),\n\t\t\t\t\t\tposition: latLng,\n\t\t\t\t\t\tmap: this.map\n\t\t\t\t\t})\n          // \u8BBE\u7F6E\u5730\u56FE\u8986\u76D6\u7269\n          if (mapTitle) {\n\t\t\t\t\t\tconst addressOverlayClass = this.getAddressOverlay(this)\n\t\t\t\t\t\tthis.addressOverlay = new addressOverlayClass(latLng, mapTitle || '', mapAddress || '')\n\t\t\t\t\t\tthis.map && this.addressOverlay.setMap(this.map)\n\t\t\t\t\t}\n\t\t\t\t\tthis.initSearchService()\n\t\t\t\t\tthis.searchService.searchNearBy(this.tabs[0].name, latLng, 3000)\n\t\t\t\t\tqq.maps.event.addListener(\n\t\t\t\t\t\tthis.map,\n\t\t\t\t\t\t'click',\n\t\t\t\t\t\t() => {\n\t\t\t\t\t\t\tthis.toClickMap()\n\t\t\t\t\t\t}\n\t\t\t\t\t);\n\t\t\t\t})\n\t\t\t},\n      // \u521D\u59CB\u5316\u5730\u56FE\u670D\u52A1\n\t\t\tinitSearchService() {\n        const { cityName = '' } = this.mapInfo\n\t\t\t\tthis.searchService = new qq.maps.SearchService({\n\t\t\t\t\tlocation: cityName,\n\t\t\t\t\tpageCapacity: 5,\n\t\t\t\t\tautoExtend: false,\n\t\t\t\t\tcomplete: (results) => {\n\t\t\t\t\t\tthis.displayedPoiList = []\n\t\t\t\t\t\tlet displayedPoiList = []\n\t\t\t\t\t\tvar pois = results.detail.pois\n\t\t\t\t\t\tfor (var i = 0, l = pois.length; i < l; i++) {\n\t\t\t\t\t\t\tvar poi = pois[i]\n\t\t\t\t\t\t\tif (poi.dist <= 3000) {\n\t\t\t\t\t\t\t\tpoi.customDist = this.getUnifiedDist(poi.dist)\n\t\t\t\t\t\t\t\tpoi.customLabelName = this.getLabelName(this.tabs[this.slectedIndex].name, poi.address)\n\t\t\t\t\t\t\t\tdisplayedPoiList.push(poi)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (displayedPoiList.length) {\n\t\t\t\t\t\t\tdisplayedPoiList = displayedPoiList.sort((poiA, poiB) => {\n\t\t\t\t\t\t\t\tlet distA = poiA.dist\n\t\t\t\t\t\t\t\tlet distB = poiB.dist\n\t\t\t\t\t\t\t\treturn distA - distB\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\tthis.displayedPoiList = displayedPoiList.slice(0, 3)\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\terror: (err) => {\n\t\t\t\t\t\tthis.displayedPoiList = []\n\t\t\t\t\t\tconsole.log(err, 'searchService err!')\n\t\t\t\t\t}\n\t\t\t\t})\n\t\t\t},\n\t\t\t// \u5207\u6362tab\u6807\u7B7E\n\t\t\tswitchTab(item, index) {\n\t\t\t\tthis.slectedIndex = index\n\t\t\t\tlet {addressLat, addressLon} = this.mapInfo\n\t\t\t\tlet region = new qq.maps.LatLng(addressLat, addressLon)\n\t\t\t\tthis.searchService && this.searchService.searchNearBy(item, region, 3000)\n\t\t\t},\n\t\t\t// \u5B9A\u4E49\u5C0F\u533A\u5730\u56FE\u4E0A\u4F4D\u7F6E\u4FE1\u606F\u8986\u76D6\u7269\n\t\t\tgetAddressOverlay() {\n\t\t\t\tfunction addressOverlay(position, title, address) {\n\t\t\t\t\tthis.position = position\n\t\t\t\t\tthis.title = title\n\t\t\t\t\tthis.address = address\n\t\t\t\t}\n\t\t\t\taddressOverlay.prototype = new qq.maps.Overlay()\n\t\t\t\t//\u5B9A\u4E49construct,\u5B9E\u73B0\u8FD9\u4E2A\u63A5\u53E3\u6765\u521D\u59CB\u5316\u81EA\u5B9A\u4E49\u7684Dom\u5143\u7D20\n\t\t\t\taddressOverlay.prototype.construct = function () {\n\t\t\t\t\tvar addressBoxDiv = this.addressBoxDiv = document.createElement(\"div\")\n\t\t\t\t\taddressBoxDiv.setAttribute(\"class\", \"address-box\")\n\t\t\t\t\t//\u5C06dom\u6DFB\u52A0\u5230\u8986\u76D6\u7269\u5C42\n\t\t\t\t\tvar panes = this.getPanes()\n\t\t\t\t\t//\u8BBE\u7F6Epanes\u7684\u5C42\u7EA7\uFF0CoverlayMouseTarget\u53EF\u63A5\u6536\u70B9\u51FB\u4E8B\u4EF6\n\t\t\t\t\tpanes.overlayMouseTarget.appendChild(addressBoxDiv)\n\t\t\t\t\tvar addressContanierHtml = '<div class=\"address-contanier\"><p class=\"address-title\">' + this.title + '</p><p class=\"address-details\">' + this.address + '</p></div>'\n\t\t\t\t\tvar arrowHtml = '<div class=\"address-arrow\"></div>'\n\t\t\t\t\taddressContanierHtml += arrowHtml\n\t\t\t\t\taddressBoxDiv.innerHTML = addressContanierHtml\n\t\t\t\t}\n\t\t\t\t//\u5B9E\u73B0draw\u63A5\u53E3\u6765\u7ED8\u5236\u548C\u66F4\u65B0\u81EA\u5B9A\u4E49\u7684dom\u5143\u7D20\n\t\t\t\taddressOverlay.prototype.draw = function () {\n\t\t\t\t\tvar overlayProjection = this.getProjection()\n\t\t\t\t\t//\u8FD4\u56DE\u8986\u76D6\u7269\u5BB9\u5668\u7684\u76F8\u5BF9\u50CF\u7D20\u5750\u6807\n\t\t\t\t\tvar pixel = overlayProjection.fromLatLngToDivPixel(this.position)\n\t\t\t\t\tvar divStyle = this.addressBoxDiv.style\n\t\t\t\t\tdivStyle.left = pixel.x + \"px\"\n\t\t\t\t\tdivStyle.top = pixel.y - 36 + \"px\"\n\t\t\t\t}\n\t\t\t\t//\u5B9E\u73B0destroy\u63A5\u53E3\u6765\u5220\u9664\u81EA\u5B9A\u4E49\u7684Dom\u5143\u7D20\uFF0C\u6B64\u65B9\u6CD5\u4F1A\u5728setMap(null)\u540E\u88AB\u8C03\u7528\n\t\t\t\taddressOverlay.prototype.destroy = function () {\n\t\t\t\t\tthis.addressBoxDiv.parentNode.removeChild(this.addressBoxDiv)\n\t\t\t\t\tthis.addressBoxDiv = null\n\t\t\t\t}\n\t\t\t\treturn addressOverlay\n\t\t\t},\n      // \u5C06\u8DDD\u79BB\u89C4\u8303\u5316\uFF0C\u4E0D\u8D85\u8FC71000m\u6574\u6570\u5C55\u793A\uFF1B\u8D85\u8FC71000\u7C73\u5C31\u6309\u516C\u91CC\u6570\u5C55\u793A\uFF0C\u4F8B\u59821.2\u516C\u91CC\n\t\t\tgetUnifiedDist(dist = 0) {\n\t\t\t\tlet unifiedDist = 0\n\t\t\t\tdist = Math.abs(Number(dist))\n\t\t\t\tif (dist <= 1000) {\n\t\t\t\t\tunifiedDist = parseInt(dist) + 'm'\n\t\t\t\t} else {\n\t\t\t\t\tunifiedDist = Math.floor(dist / 100) / 10 + 'km'\n\t\t\t\t}\n\t\t\t\treturn unifiedDist\n\t\t\t},\n\t\t\tgetLabelName(keyword, address = '') {\n\t\t\t\tlet labelName = ''\n\t\t\t\tswitch (keyword) {\n\t\t\t\t\tcase '\u516C\u4EA4':\n\t\t\t\t\t\tlabelName = '\u7AD9\u70B9'\n\t\t\t\t\t\tbreak\n\t\t\t\t\tcase '\u5730\u94C1':\n\t\t\t\t\t\tlabelName = address.replace(/\u5730\u94C1/ig, '')\n\t\t\t\t\t\tbreak\n\t\t\t\t\tdefault:\n\t\t\t\t\t\tlabelName = keyword\n\t\t\t\t}\n\t\t\t\treturn labelName\n\t\t\t},\n\t\t\ttoClickMap() {\n\t\t\t\tthis.$emit('toClickMap')\n\t\t\t}\n\t\t}\n\t}\n</script>\n<style scoped lang=\"scss\">\n  .house-location {\n    margin-top: .2rem;\n    background: #fff;\n  }\n  .map-box {\n    margin-bottom: .1rem;\n    height: 3.6rem;\n  }\n  /*tab\u6807\u7B7E start*/\n  .tab-box {\n    margin-top: .33rem;\n  }\n  .tab-ul {\n    text-align: center;\n    .tab-li {\n      height: .46rem;\n      font-size: .28rem;\n      color: #848484;\n    }\n    .selected-li {\n      position: relative;\n      color: #C7A26A;\n      font-weight: bold;\n    }\n    .selected-li:after {\n      position: absolute;\n      top: .43rem;\n      left: 50%;\n      transform: translateX(-50%);\n      -webkit-transform: translateX(-50%);\n      content: '';\n      width: .24rem;\n      height: .04rem;\n      background-color: #C7A26A;\n    }\n  }\n  .info-box {\n    padding: 0 .4rem;\n  }\n  .info-ul {\n    padding-bottom: .4rem;\n    .info-li {\n      display: flex;\n      margin-top: .26rem;\n      height: .4rem;\n      font-size: .28rem;\n      color: #2E2D2D;\n      .label-name {\n        padding: 0 .1rem;\n        height: .36rem;\n        line-height: .36rem;\n        text-align: center;\n        background-color: #ECF1F9;\n        border-radius: .04rem;\n        font-size: .24rem;\n      }\n      .info-details {\n        flex: 1;\n        margin-left: .1rem;\n        margin-right: .4rem;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n    }\n  }\n  .no-info {\n    display: flex;\n    justify-content: center;\n    -webkit-justify-content: center;\n    align-items: center;\n    -webkit-align-items: center;\n    height: 1.34rem;\n    .tip-info {\n      padding-left: .48rem;\n      font-size: .28rem;\n      color: #B7B7B8;\n      background: url('https://img11.360buyimg.com/imagetools/jfs/t1/124452/25/3178/600/5ece1822E493677f3/f1d1f431a4960b1b.png') no-repeat 0 center;\n      background-size: .28rem;\n    }\n  }\n  /*tab\u6807\u7B7E end*/\n</style>\n<style lang=\"scss\">\n  /*\u5730\u56FE\u6A21\u5757 start*/\n  .address-box {\n    position: relative;\n    width: 0;\n    height: 0;\n    z-index: 1;\n    .address-contanier {\n      position: absolute;\n      left: 50%;\n      top: -1rem;\n      transform: translateX(-50%);\n      -webkit-transform: translateX(-50%);\n      padding: .14rem .2rem 0;\n      width: 3.44rem;\n      height: .86rem;\n      border-radius: .04rem;\n      box-shadow: 0 .02rem .06rem 0 rgba(0, 0, 0, 0.30);\n      background-color: #fff;\n      .address-title {\n        line-height: .37rem;\n        font-size: .26rem;\n        color: #2E2D2D;\n        font-weight: bold;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n      .address-details {\n        margin-top: .03rem;\n        line-height: .33rem;\n        font-size: .24rem;\n        color: #848484;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n    }\n    .address-arrow {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      transform: translateX(-50%);\n      -webkit-transform: translateX(-50%);\n      width: 0;\n      height: 0;\n      border-left: .12rem solid transparent;\n      border-right: .12rem solid transparent;\n      border-top: .16rem solid #fff;\n    }\n  }\n  /*\u5730\u56FE\u6A21\u5757 end*/\n</style>\n"}});