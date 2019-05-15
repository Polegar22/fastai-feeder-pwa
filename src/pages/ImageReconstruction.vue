<template>
  <div class="imageReconstruction">
    <custom-title
      title="Let the IA correct your imperfections : "
      subtitle="Upload a face and select the parts you want to clean"
    />
    <drawable-canvas
      ref="drawableCanvas"
      class="marginTop"
      @drawEnded="sendCrapifiedImage"
    />
    <div class="marginTop">
      <v-progress-circular v-show="sending" indeterminate color="accent" />
    </div>
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import axios from '@/services/api'
import DrawableCanvas from '@/components/DrawableCanvas'
import CustomTitle from '@/components/CustomTitle'

export default {
  components: {
    DrawableCanvas,
    CustomTitle
  },
  data: function() {
    return {
      sending: false,
      error: ''
    }
  },
  methods: {
    sendCrapifiedImage() {
      this.sending = true
      let crapified = this.$refs.drawableCanvas.getCrapifiedImage()

      let formData = new FormData()
      formData.append('image', crapified)
      axios
        .post('/image-reconstruction', formData)
        .then(response => {
          this.sending = false
          this.$refs.drawableCanvas.setImageToCanvas(response.data)
        })
        .catch(err => {
          this.sending = false
          this.error = err.response.status + ' ' + err.response.statusText
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.imageReconstruction {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.marginTop {
  margin-top: 15px;
}
</style>
