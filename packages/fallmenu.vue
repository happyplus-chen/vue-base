<style scoped>
* {
  padding: 0;
  margin: 0;
}
.fall-menu {
  height: 50px;
  overflow: hidden;
}
.menu-item {
  display: inline-block;

  background: #00ff40;
}
.menu-item a {
  margin: 10px 16px;
  height: 50px;
  line-height: 50px;
}
.before,
.after {
  display: inline-block;
  line-height: 50px;
  width: 40px;
  background: red;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active 在低于 2.1.8 版本中 */ {
  opacity: 0;
  transform: translateY(30px);
}
.flip-list-move {
  transition: transform 1s;
}
</style>

<template>
    <div class="fall-menu">
        <ul ref="level1">
            <span class="before" @click="prev">
                <a v-if="current !== 0">&lt;</a>
            </span>
            <transition-group name="list">
                <li class="menu-item" v-for="(item,index) in data" :key="index">
                    <a href="#">{{item}}</a>
                </li>
            </transition-group>
            <span class="after" @click="next">
                <a v-if="current < pagesize">&gt;</a>
            </span>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      cache: [],
      pos: [],
      width: 0,
      g: {},
      pagesize: 1,
      current: 0,
      data: [
        '熊掌号',
        '百度百聘',
        '好看视频',
        '百度信誉',
        '百度营销中心',
        '百度技术学院',
        '百度人工翻译',
        '百度软件中心',
        '网页',
        '视频',
        '百度翻译',
        '音乐',
        '地图',
        '新闻',
        '图片',
        '百度识图',
        '百度音乐人',
        '百度财富',
        '百度外卖',
        '百度传课',
        '百度学术',
        '桌面百度',
        'hao123',
        '网站导航',
        '百度口碑',
        '百度取证',
        '百家号',
        '百度广播开放平台',
        '百度VR社区',
        '度秘',
        '百度安全论坛',
        '文库',
        '百度网盘',
        '百科',
        '贴吧',
        '知道',
        '经验',
        '百度股市通',
        '百度钱包',
        '百度阅读',
        '百度旅游',
        '百度众测',
        '百度金融商城',
        '百度社团赞助平台',
        '百度糯米',
        '宝宝知道',
        '百度优课',
        '91手游网',
        '百度游戏',
        '百度开发者平台',
        '百度 H5',
        '百度理财',
        '百度手机输入法',
        '百度手机浏览器',
        '百度手机助手',
        '百度魔图'
      ]
    }
  },
  methods: {
    next() {
      if (this.current === this.pagesize) return
      this.current++
    },
    prev() {
      if (this.current === 0) return
      this.current--
    },
    group(index = 0, page = 0) {
      this.g[page] = this.cache.slice(index)
      this.pagesize = page
      let p = this.pos
      let count = 0
      for (let i = index; i < p.length; i++) {
        count += p[i]
        if (count > this.width - 80) {
          this.g[page] = this.cache.slice(index, i)
          return this.group(i, page + 1)
        }
      }
    }
  },
  watch: {
    width() {
      this.g = {}
      this.current = 0
      this.group()
    },
    g(v) {
      console.log(v)
      this.data = this.g['0']
    },
    current(value) {
      this.data = this.g[value]
    }
  },

  created() {
    this.cache = this.data.concat()
  },

  mounted() {
    this.width = this.$el.clientWidth
    let lis = this.$refs['level1'].querySelectorAll('li')
    for (let i = 0; i < lis.length; i++) {
      this.pos.push(lis[i].clientWidth)
    }
    this.group()
    window.onresize = () => {
      this.width = this.$el.clientWidth
    }
  },
  computed: {
    // showData() {
    //   return this.g[this.current]
    // }
  }
}
</script>
