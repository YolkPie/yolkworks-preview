webpackJsonp([58],{123:/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/boilerplates/custom/vue-blocks-AddrPc/codepan.js ***!
  \****************************************************************************************//*! dynamic exports provided *//*! all exports used */function(a){a.exports="new Vue({\n        data () {\n            return {\n                topBox: '100px',\n                addrFText: '\u4E0D\u9650',\n                addrSText: '',\n                addrTText: '',\n                addrFId: 9999,\n                addrSId: 9999,\n                addrTId: 9999,\n                searchDataList: [],\n                showAddr: 'none',\n                addrFList: [\n                    { 'name': '\u4E0D\u9650', 'id': 9999 },\n                    { 'name': '\u5317\u4EAC', 'id': 1 },\n                    { 'name': '\u4E0A\u6D77', 'id': 2 },\n                    { 'name': '\u5929\u6D25', 'id': 3 },\n                    { 'name': '\u91CD\u5E86', 'id': 4 },\n                    { 'name': '\u6CB3\u5317', 'id': 5 },\n                    { 'name': '\u5C71\u897F', 'id': 6 },\n                    { 'name': '\u6CB3\u5357', 'id': 7 },\n                    { 'name': '\u8FBD\u5B81', 'id': 8 },\n                    { 'name': '\u5409\u6797', 'id': 9 },\n                    { 'name': '\u9ED1\u9F99\u6C5F', 'id': 10 },\n                    { 'name': '\u5185\u8499\u53E4', 'id': 11 },\n                    { 'name': '\u6C5F\u82CF', 'id': 12 },\n                    { 'name': '\u5C71\u4E1C', 'id': 13 },\n                    { 'name': '\u5B89\u5FBD', 'id': 14 },\n                    { 'name': '\u6D59\u6C5F', 'id': 15 },\n                    { 'name': '\u798F\u5EFA', 'id': 16 },\n                    { 'name': '\u6E56\u5317', 'id': 17 },\n                    { 'name': '\u6E56\u5357', 'id': 18 },\n                    { 'name': '\u5E7F\u4E1C', 'id': 19 },\n                    { 'name': '\u5E7F\u897F', 'id': 20 },\n                    { 'name': '\u6C5F\u897F', 'id': 21 },\n                    { 'name': '\u56DB\u5DDD', 'id': 22 },\n                    { 'name': '\u6D77\u5357', 'id': 23 },\n                    { 'name': '\u8D35\u5DDE', 'id': 24 },\n                    { 'name': '\u4E91\u5357', 'id': 25 },\n                    { 'name': '\u897F\u85CF', 'id': 26 },\n                    { 'name': '\u9655\u897F', 'id': 27 },\n                    { 'name': '\u7518\u8083', 'id': 28 },\n                    { 'name': '\u9752\u6D77', 'id': 29 },\n                    { 'name': '\u5B81\u590F', 'id': 30 },\n                    { 'name': '\u65B0\u7586', 'id': 31 },\n                    { 'name': '\u53F0\u6E7E', 'id': 32 },\n                    { 'name': '\u9493\u9C7C\u5C9B', 'id': 84 },\n                    { 'name': '\u6E2F\u6FB3\u5730\u533A', 'id': 52993 },\n                    { 'name': '\u6D77\u5916\u5730\u533A', 'id': 53283 }\n                ],\n                addrSList: [],\n                addrTList: []\n            }\n        },\n        created () {\n            alert('\u5728\u4EE3\u7801\u91CC\u4F20\u503C\u63A7\u5236\u663E\u793A\u5230\u4E8C\u7EA7\u8FD8\u662F\u4E09\u7EA7\u5730\u5740')\n        },\n        mounted () {\n        },\n        methods: {\n            showAddrClick (flag) {\n                this.showAddr == flag ? this.showAddr = 'none' : this.showAddr = flag\n            },\n            fristAddrClick (item) {\n                if (this.addrFId != item.id) {\n                    this.addrFText = item.name\n                    this.addrFId = item.id\n                    if (item.id != 9999) {\n                        Addr(item.id).then(data => {\n                            data.data.unshift({ 'name': '\u4E0D\u9650', 'id': 9999 })\n                            this.addrSList = data.data\n                            this.addrSText = this.addrSList[0].name\n                            this.addrSId = 9999\n                            this.addrTList = []\n                            this.addrTText = ''\n                            this.addrTId = 9999\n                            this.getNewData()\n                        }).catch(err => {\n                            console.log(err)\n                        })\n                    } else {\n                        this.addrSList = []\n                        this.addrSId = 9999\n                        this.addrSText = ''\n                        this.addrTList = []\n                        this.addrTText = ''\n                        this.addrTId = 9999\n                        this.getNewData()\n                    }\n                }\n                this.showAddr = 'none'\n            },\n            seconAddrClick (item, showthree) {\n                this.addrSText = item.name\n                this.addrSId = item.id\n                if (this.addrFId < 5 || item.id == 9999) {\n                    this.addrTList = []\n                    this.addrTId = 9999\n                    this.addrTText = ''\n                    this.getNewData()\n                } else {\n                    if (showthree) {\n                        Addr(item.id).then(data => {\n                            data.data.unshift({ 'name': '\u4E0D\u9650', 'id': 9999 })\n                            this.addrTList = data.data\n                            this.addrTText = this.addrTList[0].name\n                            this.addrTId = 9999\n                            this.getNewData()\n                        }).catch(err => {\n                            console.log(err)\n                            this.showAddr = 'none'\n                        })\n                    } else {\n                        this.addrTList = []\n                        this.addrTId = 9999\n                        this.addrTText = ''\n                        this.getNewData()\n                    }\n                }\n            },\n            threeAddrClick (item) {\n                this.addrTText = item.name\n                this.addrTId = item.id\n                this.getNewData()\n            },\n            getNewData () {\n                this.showAddr = 'none'\n                alert(this.addrFText+this.addrSText+this.addrTText)\n                var bodyitem = {\n                    provinceId: this.addrFId == 9999 ? '' : this.addrFId,\n                    cityId: this.addrSId == 9999 ? '' : this.addrSId,\n                    countyId: this.addrTId == 9999 ? '' : this.addrTId,\n                    provinceName: this.addrFText,\n                    cityName: this.addrSText,\n                    countyName: this.addrTText\n                }\n                console.log(bodyitem)\n            }\n        }\n    }\n).$mount('#app')\r\n"}});