<template>
  <div class="out">
    <div class="file-out">
      <input type="file" class="file" ref="file" @change="filechange" accept="image/gif,image/jpeg,image/jpg,image/png">
      <img v-show="previewImg" :src="previewImg" alt="">
    </div>
    <div class="crop-out" v-show="crop">
      <vueCropper
        ref="cropper2"
        :img="example2.img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :autoCropWidth="example2.autoCropWidth"
        :autoCropHeight="example2.autoCropHeight"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
        :canMove="example2.imgCanmove"
      ></vueCropper>
      <div class="opts dis-fl">
        <button class="cancle" @click.prevent="cancle">取消</button>
        <button class="upload" @click.prevent="upload">上传</button>
      </div>
    </div>
  </div>
</template>

<script>
  import vueCropper from 'vue-cropper'
  export default {
    components: {
      vueCropper
    },
    data () {
      return {
        crop: false,
        previewImg: '',
        example2: {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          imgCanmove: false,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 100,
          autoCropHeight: 100,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        }
      }
    },
    methods: {
      filechange (event) {
        var _this = this
        console.log(this.$refs.file.files)
        var reader = new FileReader()
        reader.onload = function () {
          var dataURL = reader.result
          _this.example2.img = dataURL
          _this.crop = true
        }
        reader.readAsDataURL(this.$refs.file.files[0])
      },
      upload () {
        this.$refs.cropper2.getCropData((data) => {
          var _this = this
          // do something
          console.log(data)
          const params = {
            compressfmt: '100:100,xxs,xs,s,m,l,xl,xxl',
            pic: data
          }
          var str = data.split(',')[1]
          var equalIndex = str.indexOf('=')
          if (str.indexOf('=') > 0) {
            str = str.substring(0, equalIndex)
          }
          var strLength = str.length
          var fileLength = parseInt(strLength - (strLength / 8) * 2)
          if (fileLength > (1024 * 1024 * 2)) {
            _this.$vux.alert.show({
              title: '提示',
              content: '上传图片大小不超过2MB！'
            })
          } else {
            _this.$vux.loading.show({
              text: 'Loading'
            })
            _this.$http.post(_this.$root.urlPath.UPLOAD + '/upload/c', params).then(function (res) {
              if (res.body.path) {
                _this.$vux.loading.hide()
                _this.$vux.alert.show({
                  title: '提示',
                  content: '上传成功！',
                  onHide () {
                    _this.$emit('imgUrl', res.body.path)
                    _this.previewImg = res.body.path
                    _this.crop = false
                  }
                })
              } else {
                _this.$vux.loading.hide()
              }
            })
          }
        })
      },
      cancle () {
        this.crop = false
      }
    }
  }
</script>

<style scoped>
  .file-out {
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('../../common/img/upload1.png') no-repeat;
    background-size: 100% 100%;
  }
  .file-out img{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%
  }
  .file-out .file{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .crop-out{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .opts{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    justify-content: space-around;
  }
  .opts button{
    display: inline-block;
    padding: 0.07rem 0.20rem;
    border: none;
    border-radius: 3px;
  }
  .opts .cancle{
    background: #93e690;
    color: #fff;
  }
  .opts .upload{
    background: #00a5f5;
    color: #fff;
  }
</style>
