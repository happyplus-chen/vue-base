
<style scoped>
.img-container {
  margin: auto;
}
.img-container > img {
  max-width: 100%;
}
.opration {
 text-align: center;
  background-color: rgba(55, 55, 55, 0.5);
  position: relative;
  padding-top: 4px;
  height: 36px;
  line-height: 36px;
}
.opration span {
  width: 26px;
  height: 26px;
  /* margin-left: 4px; */
  display: inline-block;
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
}
.opration span:hover{
    background-color: rgba(0, 0, 0, 0.8);
}

.opration span.max {
   width: 30px;
  height: 30px;
}

</style>
<style scoped>
.crop-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.5);
  height: 100%;
  z-index: 1000;
}
.crop-modal-warp {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.crop-modal {
  position: relative;
  top: 100px;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
  box-sizing: border-box;
  width: 50%;
}
.moda-close {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
}
.moda-close::before {
  content: 'X';
  position: absolute;
  bottom: 13px;
  left: 22px;
  color: #fff;
}
</style>
<template>
  <div class="">
    <div v-show="show" class="crop-modal-mask">
      <div class="moda-close" @click.native="show=false">X</div>
      <div class="crop-modal-warp">
        <div class="crop-modal">
          <div class="crop-container">
            <div class="img-container">
              <img :src="imgsrc" alt="Picture" ref="img">
            </div>
          </div>
          <ul class="opration">
            <span ref="browse">U</span>
            <span @click="crop">1</span>
            <span @click="crop">X</span>
            <span @click="crop">C</span>
            <span class="max" @click="crop">R</span>
            <span @click="crop">S</span>
            <span @click="crop">L</span>
            <span @click="crop">C</span>
            <span :href="cropimg" download="cropped.jpg">D</span>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './css/cropper.css'
import plupload from 'plupload/js/plupload.full.min.js'
import Cropper from './js/cropper.js'

const mOxie = plupload.moxie
export default {
  data() {
    return {
      show: true,
      cropper: null,
      cropimg: '',
      imgsrc: 'static/images/picture.jpg',
      options: {},
      image: null
    }
  },
  methods: {
    crop() {
      this.cropimg = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
    },
    rotate(num = 45) {
      this.cropper.rotate(num)
    },
    setSrc(src) {
      this.cropper.destroy()
      this.imgsrc = src
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs['img'], this.options)
      })
    },

    previewImage(file, callback) {
      // file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
      if (!file || !/image\//.test(file.type)) return // 确保文件是图片
      if (file.type === 'image/gif') {
        // gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.file.FileReader()
        fr.onload = function() {
          callback(fr.result)
          fr.destroy()
          fr = null
        }
        fr.readAsDataURL(file.getSource())
      } else {
        var preloader = new mOxie.image.Image()
        preloader.onload = function() {
          // preloader.downsize(300, 300) // 先压缩一下要预览的图片,宽300，高300
          var imgsrc =
            preloader.type === 'image/jpeg'
              ? preloader.getAsDataURL('image/jpeg', 80)
              : preloader.getAsDataURL() // 得到图片src,base64编码
          callback && callback(imgsrc) // callback传入的参数为预览图片的url
          preloader.destroy()
          preloader = null
        }
        preloader.load(file.getSource())
      }
    },
    initUpload() {
      var uploader = new plupload.Uploader({
        // 实例化一个plupload上传对象
        url: 'upload.html',
        browse_button: this.$refs['browse'],
        flash_swf_url: 'static/Moxie.swf',
        silverlight_xap_url: 'static/Moxie.xap',
        filters: {
          mime_types: [
            // 只允许上传图片文件
            { title: '图片文件', extensions: 'jpg,gif,png' }
          ]
        }
      })
      uploader.init() // 初始化

      // 绑定文件添加进队列事件
      uploader.bind('FilesAdded', (uploader, files) => {
        this.previewImage(files[0], this.setSrc)
      })
    }
  },
  mounted() {
    window.vm = this
    this.options = {
      aspectRatio: null,
      viewMode: '2',
      preview: '.img-preview',
      ready(e) {
        console.log(e.type)
        this.cropper.setDragMode('move')
      },
      cropstart: function(e) {
        console.log(e.type, e.detail.action)
      },
      cropmove: function(e) {
        console.log(e.type, e.detail.action)
      },
      cropend: function(e) {
        console.log(e.type, e.detail.action)
      },
      crop: function(e) {
        var data = e.detail
        console.log(e.type, data)
      },
      zoom: function(e) {
        console.log(e.type, e.detail.ratio)
      }
    }
    this.cropper = new Cropper(this.$refs['img'], this.options)
    this.initUpload()
  }
}
</script>

