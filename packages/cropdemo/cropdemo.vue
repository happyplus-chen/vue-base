<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <!-- <h3>Demo:</h3> -->
        <div class="img-container">
          <img :src="imgsrc" alt="Picture" ref="img">
        </div>
      </div>
      <div class="col-md-3">
        <!-- <h3>Preview:</h3> -->
        <div class="docs-preview clearfix">
          <div class="img-preview preview-lg"></div>
          <!-- <div class="img-preview preview-md"></div>
          <div class="img-preview preview-sm"></div>
          <div class="img-preview preview-xs"></div> -->
        </div>
        <div>
          <button ref="browse">upload</button>
          <button @click="crop">crop</button>
          <a :href="cropimg" download="cropped.jpg">download</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import './css/bootstrap.min.css'
import './css/cropper.css'
import plupload from 'plupload/js/plupload.full.min.js'
import Cropper from './js/cropper.js'

const mOxie = plupload.moxie
export default {
  data() {
    return {
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
          preloader.downsize(300, 300) // 先压缩一下要预览的图片,宽300，高300
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
<style scoped>
.img-container,
.img-preview {
  background-color: #f7f7f7;
  text-align: center;
  width: 100%;
}

.img-container {
  margin-bottom: 1rem;
  max-height: 497px;
  /* min-height: 200px; */
  width: 500px;
  /* height: 200px; */
}

@media (min-width: 768px) {
  /* .img-container {
    min-height: 497px;
  } */
}

.img-container > img {
  max-width: 100%;
}

.docs-preview {
  margin-right: -1rem;
}

.img-preview {
  float: left;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
}

.img-preview > img {
  max-width: 100%;
}

.preview-lg {
  height: 9rem;
  width: 16rem;
}

.preview-md {
  height: 4.5rem;
  width: 8rem;
}

.preview-sm {
  height: 2.25rem;
  width: 4rem;
}

.preview-xs {
  height: 1.125rem;
  margin-right: 0;
  width: 2rem;
}
</style>
