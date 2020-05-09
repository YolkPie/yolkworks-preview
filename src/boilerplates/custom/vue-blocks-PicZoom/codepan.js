new Vue({
        name: 'action',
        data () {
            return {
                imagesList: [
                    'https://storage.jd.com/pharos-court/62-1585046419856-2000.png?Expires=1588646419&AccessKey=52f5OEDwzTdtPHPe&Signature=ZbyVVZVOxNvSgVFcumrrOPEp5VQ%3D',
                    'https://img11.360buyimg.com/da/jfs/t1/96224/36/13679/224381/5e5a0446E33967fa4/c606fa8a59909df3.jpg',
                    '//img.tuguaishou.com/ips_templ_preview/w432_q100/a1/46/83/lg_2948246_1586328656_5e8d7450e1246.jpg?auth_key=2218809600-0-0-d035c3824ec25f154990686e76f33d61',
                    '//weiliicimg9.pstatp.com/weili/sm/238634000859791603.webp',
                    '//icweiliimg1.pstatp.com/weili/sm/457195626647257499.webp',
                    'https://img11.360buyimg.com/da/s300x300_jfs/t1/94757/37/13969/150681/5e60b196E059e60e5/80061c9442295812.jpg'
                ],
                imgUrl: '',
                hoverIndex: 0,
                swiperOption: {
                    loop: false,
                    direction: 'horizontal',
                    autoHeight: true,
                    slidesPerView: 5,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        created () {
        },
        props: [],
        components: {
            PicZoom
        },
        mounted () {
            this.imgUrl = this.imagesList[0]
        },
        methods: {
            changeImage (index) {
                this.hoverIndex = index
                this.imgUrl = this.imagesList[index]
            }
        }
    }
).$mount('#app')
