new Vue({
        data () {
            return {
                topBox: '100px',
                addrFText: '不限',
                addrSText: '',
                addrTText: '',
                addrFId: 9999,
                addrSId: 9999,
                addrTId: 9999,
                searchDataList: [],
                showAddr: 'none',
                addrFList: [
                    { 'name': '不限', 'id': 9999 },
                    { 'name': '北京', 'id': 1 },
                    { 'name': '上海', 'id': 2 },
                    { 'name': '天津', 'id': 3 },
                    { 'name': '重庆', 'id': 4 },
                    { 'name': '河北', 'id': 5 },
                    { 'name': '山西', 'id': 6 },
                    { 'name': '河南', 'id': 7 },
                    { 'name': '辽宁', 'id': 8 },
                    { 'name': '吉林', 'id': 9 },
                    { 'name': '黑龙江', 'id': 10 },
                    { 'name': '内蒙古', 'id': 11 },
                    { 'name': '江苏', 'id': 12 },
                    { 'name': '山东', 'id': 13 },
                    { 'name': '安徽', 'id': 14 },
                    { 'name': '浙江', 'id': 15 },
                    { 'name': '福建', 'id': 16 },
                    { 'name': '湖北', 'id': 17 },
                    { 'name': '湖南', 'id': 18 },
                    { 'name': '广东', 'id': 19 },
                    { 'name': '广西', 'id': 20 },
                    { 'name': '江西', 'id': 21 },
                    { 'name': '四川', 'id': 22 },
                    { 'name': '海南', 'id': 23 },
                    { 'name': '贵州', 'id': 24 },
                    { 'name': '云南', 'id': 25 },
                    { 'name': '西藏', 'id': 26 },
                    { 'name': '陕西', 'id': 27 },
                    { 'name': '甘肃', 'id': 28 },
                    { 'name': '青海', 'id': 29 },
                    { 'name': '宁夏', 'id': 30 },
                    { 'name': '新疆', 'id': 31 },
                    { 'name': '台湾', 'id': 32 },
                    { 'name': '钓鱼岛', 'id': 84 },
                    { 'name': '港澳地区', 'id': 52993 },
                    { 'name': '海外地区', 'id': 53283 }
                ],
                addrSList: [],
                addrTList: []
            }
        },
        created () {
            alert('在代码里传值控制显示到二级还是三级地址')
        },
        mounted () {
        },
        methods: {
            showAddrClick (flag) {
                this.showAddr == flag ? this.showAddr = 'none' : this.showAddr = flag
            },
            fristAddrClick (item) {
                if (this.addrFId != item.id) {
                    this.addrFText = item.name
                    this.addrFId = item.id
                    if (item.id != 9999) {
                        Addr(item.id).then(data => {
                            data.data.unshift({ 'name': '不限', 'id': 9999 })
                            this.addrSList = data.data
                            this.addrSText = this.addrSList[0].name
                            this.addrSId = 9999
                            this.addrTList = []
                            this.addrTText = ''
                            this.addrTId = 9999
                            this.getNewData()
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.addrSList = []
                        this.addrSId = 9999
                        this.addrSText = ''
                        this.addrTList = []
                        this.addrTText = ''
                        this.addrTId = 9999
                        this.getNewData()
                    }
                }
                this.showAddr = 'none'
            },
            seconAddrClick (item, showthree) {
                this.addrSText = item.name
                this.addrSId = item.id
                if (this.addrFId < 5 || item.id == 9999) {
                    this.addrTList = []
                    this.addrTId = 9999
                    this.addrTText = ''
                    this.getNewData()
                } else {
                    if (showthree) {
                        Addr(item.id).then(data => {
                            data.data.unshift({ 'name': '不限', 'id': 9999 })
                            this.addrTList = data.data
                            this.addrTText = this.addrTList[0].name
                            this.addrTId = 9999
                            this.getNewData()
                        }).catch(err => {
                            console.log(err)
                            this.showAddr = 'none'
                        })
                    } else {
                        this.addrTList = []
                        this.addrTId = 9999
                        this.addrTText = ''
                        this.getNewData()
                    }
                }
            },
            threeAddrClick (item) {
                this.addrTText = item.name
                this.addrTId = item.id
                this.getNewData()
            },
            getNewData () {
                this.showAddr = 'none'
                alert(this.addrFText+this.addrSText+this.addrTText)
                var bodyitem = {
                    provinceId: this.addrFId == 9999 ? '' : this.addrFId,
                    cityId: this.addrSId == 9999 ? '' : this.addrSId,
                    countyId: this.addrTId == 9999 ? '' : this.addrTId,
                    provinceName: this.addrFText,
                    cityName: this.addrSText,
                    countyName: this.addrTText
                }
                console.log(bodyitem)
            }
        }
    }
).$mount('#app')
