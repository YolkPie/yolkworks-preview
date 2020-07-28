new Vue({
		props: {
			imgList: {
				type: Array,
				default: []
      },
			options: {
				type: Object,
				default () {
					return {}
				}
			},
			pswpStyle: {
				type: Object,
				default () {
					return {}
				}
      }
    },
    data() {
			return {
				photoSwipe: null
      }
    },
    methods: {
			initImgs(imgs) {
				return imgs.map(item => {
					if (item.w === undefined) {
						item.w = 0
						item.h = 0
					}
					return item
				})
			},
			init(options, imgs) {
				const self = this
				this.imgs = imgs
				this.photoswipe = new PhotoSwipe(this.$el, false, this.imgs, options)
				this.photoswipe.listen('gettingData', function (index, item) {
					if (!item.w || !item.h) {
						const img = new Image()
						img.onload = function () {
							item.w = this.width
							item.h = this.height
							self.photoswipe.updateSize(true)
						}
						img.src = item.src
					}
				})
				this.photoswipe.init()
      },
			show(index) {
				return new Promise((resolve) => {
					this.$nextTick(() => {
						const options = {
							...this.options,
							index
						}
						console.log(this.imgList, 'this.imgList')
						this.init(options, this.initImgs(this.imgList))
						resolve(this.photoswipe)
					})
				})
			},
    }
	}
).$mount('#app')
