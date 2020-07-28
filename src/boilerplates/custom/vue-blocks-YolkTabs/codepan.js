new Vue({
		name: "yolkTabs",
		props: {
			tabs: {
				type: Array,
				default: []
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
				curActive: 0,
				innerLineStyle: {}
			}
		},
		watch: {
			curActive() {
				this.scrollIntoView()
				this.setLine()
			}
		},
		mounted() {
			this.setLine()
			try {
				// todo 防止页面未加载完毕，获取不到dom元素及其位置信息
				document.onreadystatechange = () => { // 当页面加载状态改变的时候执行这个方法
					if (document.readyState === 'complete') { // 当页面加载状态为完全结束时进入
						this.setLine()
					}
				}
			} catch (e) {	}
		},
		methods: {
			clickTabItem(tab, index) {
				if (index !== this.curActive) {
					this.curActive = index
					this.clickTabItemFunc(tab, index)
				}
			},
			scrollIntoView(immediate) {
				if (!this.scrollable || !this.$refs.tabs) {
					return
				}
				const tab = this.$refs.tabs[this.curActive]
				const { nav } = this.$refs
				const { scrollLeft, offsetWidth: navWidth } = nav
				const { offsetLeft, offsetWidth: tabWidth } = tab
				this.scrollTo(nav, scrollLeft, offsetLeft - (navWidth - tabWidth) / 2, immediate)
			},
			scrollTo(el, from, to, immediate) {
				if (immediate) {
					el.scrollLeft += to - from
					return
				}
				let count = 0
				// 大多电脑显示器的刷新频率是60HZ，大概是每秒钟重绘60次。
				// 因此，最平滑的动画效的最佳循环间隔是1000ms/60，约等于16.6ms
				const frames = Math.round(this.duration * 1000 / 16)
				const animate = () => {
					el.scrollLeft += (to - from) / frames
					if (++count < frames) {
						raf(animate)
					}
				}
				animate()
			},
			setLine() {
				this.$nextTick(() => {
					if (!this.$refs.tabs || !this.$refs.tabLine) {
						return
					}
					const tab = this.$refs.tabs[this.curActive]
					const tabLine = this.$refs.tabLine
					const width = tabLine.offsetWidth
					const left = tab.offsetLeft + (tab.offsetWidth - width) / 2
					this.innerLineStyle = {
						...this.lineStyle,
						transform: `translateX(${left}px)`,
						transitionDuration: `${this.duration}s`,
					}
				})
			},
		}
	}
).$mount('#app')
