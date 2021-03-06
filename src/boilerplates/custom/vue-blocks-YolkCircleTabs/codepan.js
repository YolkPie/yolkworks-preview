new Vue({
		props: {
			tabs: {
				type: Array,
				default: []
			},
			curActive: { // 当前选中的tab签的类型
				type: Number
			},
			scrollable: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 0.2
			}, // 滚动的间隔
			navStyle: {
				type: Object
			}, // tabs导航条的样式，可以定义高度、颜色等
			tabItemStyle: {
				type: Object
			}, // 每个tab项的样式，可以定义字体大小和颜色等
			lineStyle: {
				type: Object
			}, // 选中'线条'的样式，包括位置、颜色等
			clickTabItemFunc: {
				type: Function
			}, // 点击tab项执行的方法
		},
		data() {
			return {
				curActiveIndex: 0, // 当前选择的index
				savedNavScrollInfo: null, // 记住nav导航条滚动的位置，防止页面后退时，滚动的位置有误
			}
		},
		watch: {
			curActive() { // 当前选中的类型
				this.scrollIntoView()
			},
		},
		created() {
			this.scrollIntoView()
		},
		activated() {
			this.$nextTick(() => {
				// 若是有tab导航条滚动的位置数据，滚动到相应的位置
				if (this.savedNavScrollInfo && this.savedNavScrollInfo.el) {
					setTimeout(() => {
						const { el, scrollLeft } = this.savedNavScrollInfo
						el.scrollLeft = scrollLeft
					}, 100)
				}
			})
			// 记住tab导航条滚动的位置
			if (this.$refs.nav) {
				this.$refs.nav.addEventListener('touchmove',()=>{
					this.savedNavScrollInfo = {
						el: this.$refs.nav,
						scrollLeft: this.$refs.nav.scrollLeft
					}
				})
			}
		},
		deactivated() {
			if (this.$refs.nav) {
				this.$refs.nav.removeEventListener('touchmove')
			}
		},
		methods: {
			clickTabItem(tab, index) {
				if (tab.type !== this.curActive) {
					this.clickTabItemFunc(tab, index)
				}
			},
			scrollIntoView(immediate) {
				this.$nextTick(() => {
					if (!this.scrollable || !this.$refs.tabs) {
						return
					}
					let curActiveIndex = 0
					this.tabs.some((item, index) => {
						if (item.type === this.curActive) {
							curActiveIndex = index
							return true
						}
					})
					const tab = this.$refs.tabs[curActiveIndex]
					// 刚开始offsetWidth获取不到
					setTimeout(() => {
						const { nav } = this.$refs
						const { scrollLeft, offsetWidth: navWidth } = nav
						const { offsetLeft, offsetWidth: tabWidth } = tab
						const toPosition = offsetLeft - (navWidth - tabWidth) / 2
						this.savedNavScrollInfo = {
							el: nav,
							scrollLeft: toPosition - scrollLeft
						}
						this.scrollTo(nav, scrollLeft, toPosition, immediate)
					}, 50)
				})
			},
			scrollTo(el, from, to, immediate) {
				if (immediate) {
					el.scrollLeft += to - from
					return
				}
				let count = 0
				const frames = Math.round(this.duration * 1000 / 16)
				const animate = () => {
					el.scrollLeft += (to - from) / frames
					if (++count < frames) {
						raf(animate)
					}
				}
				animate()
			}
		}
	}
).$mount('#app')
