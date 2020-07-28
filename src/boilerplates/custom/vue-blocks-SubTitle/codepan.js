new Vue({
		props: {
			title: { // 子标题的内容
				type: String,
				required: true
			},
			isShowHandleBtn: { // 是否展示操作按钮
				type: Boolean,
				default: false
			},
			handleBtnText: { // 操作按钮名称
				type: String,
				default: '详情'
			},
		},
		methods: {
			clickTitleHandleBtn() {
				this.$emit('clickTitleHandleBtn')
			}
		}
	}
).$mount('#app')
