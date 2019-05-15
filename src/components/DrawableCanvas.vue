<template>
  <div class="drawableContainer">
    <div style="width:300px">
      <v-text-field
        label="Upload a file"
        prepend-icon="attach_file"
        @click.native="openDialog"
      />
      <input
        v-show="false"
        id="input"
        type="file"
        @change="fileSelected($event.target.files)"
      />
    </div>
    <canvas ref="drawableCanvas" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      canvas: null,
      ctx: null,
      clientWidth: null,
      maxWidth: null,
      rect: {},
      drag: false,
      canDraw: false
    }
  },
  mounted() {
    this.canvas = this.$refs.drawableCanvas
    this.ctx = this.canvas.getContext('2d')
    this.clientWidth = document.documentElement.clientWidth - 20
    this.maxWidth = this.clientWidth < 600 ? this.clientWidth : 600

    this.canvas.addEventListener('mousedown', this.mouseDown, false)
    this.canvas.addEventListener('mouseup', this.mouseUp, false)
    this.canvas.addEventListener('mousemove', this.mouseMove, false)

    this.canvas.addEventListener('touchstart', this.mouseDown, false)
    this.canvas.addEventListener('touchend', this.mouseUp, false)
    this.canvas.addEventListener('touchmove', this.mouseMove, false)
  },
  methods: {
    openDialog() {
      document.getElementById('input').click()
    },

    fileSelected(file) {
      var reader = new FileReader()
      let self = this
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      reader.onload = function(event) {
        var img = new Image()
        img.onload = function() {
          let width = img.width
          let height = img.height
          if (img.width > self.maxWidth) {
            width = self.maxWidth
            height = img.height * (width / img.width)
          }
          self.canvas.width = width
          self.canvas.height = height
          self.ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            self.canvas.width,
            self.canvas.height
          )
          self.canDraw = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file[0])
    },

    mouseDown(e) {
      let pageX = e.pageX ? e.pageX : e.changedTouches[0].pageX
      let pageY = e.pageY ? e.pageY : e.changedTouches[0].pageY

      this.rect.startX = pageX - this.canvas.offsetLeft
      this.rect.startY = pageY - this.canvas.offsetTop
      this.drag = true
    },
    mouseUp() {
      this.drag = false
      if (this.canDraw) {
        this.$emit('drawEnded')
        this.canDraw = false
      }
    },
    mouseMove(e) {
      if (this.drag && this.canDraw) {
        let pageX = e.pageX ? e.pageX : e.changedTouches[0].pageX
        let pageY = e.pageY ? e.pageY : e.changedTouches[0].pageY

        let ratioW = this.canvas.width / this.canvas.clientWidth
        let ratioH = this.canvas.height / this.canvas.clientHeight

        this.rect.w = pageX - this.canvas.offsetLeft - this.rect.startX
        this.rect.h = pageY - this.canvas.offsetTop - this.rect.startY

        this.ctx.fillRect(
          this.rect.startX * ratioW,
          this.rect.startY * ratioH,
          this.rect.w * ratioW,
          this.rect.h * ratioH
        )
      }
    },
    getCrapifiedImage() {
      return this.canvas.toDataURL()
    },

    setImageToCanvas(reconstructed) {
      let image = new Image()
      let self = this
      image.onload = function() {
        self.canvas.width = self.maxWidth
        self.canvas.height = image.height * (self.maxWidth / image.width)
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
        self.ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          self.canvas.width,
          self.canvas.height
        )
        self.canDraw = true
      }
      image.src = 'data:image/jpeg;base64,' + reconstructed
    }
  }
}
</script>
<style lang="scss" scoped>
.drawableContainer {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  canvas {
    touch-action: none;
  }
}
</style>
