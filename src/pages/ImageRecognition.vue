<template>
  <div class="imageUpload">
    <h2>{{ aiResponse }}</h2>
    <vue-dropzone
      id="dropzone"
      ref="myVueDropzone"
      style="margin-top:30px"
      :options="dropzoneOptions"
      duplicate-check
      :use-custom-slot="true"
      @vdropzone-success="uploadSucceded"
      @vdropzone-removed-file="fileDeleted"
    >
      <div>
        <h3 class="dropzone-custom-title">
          Drag and drop to upload content!
        </h3>
        <div class="subtitle">
          ...or click to select a file from your computer
        </div>
      </div>
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from '@/services/api'

export default {
  name: 'UploadImage',
  components: {
    VueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        maxFiles: 1,
        thumbnailHeight: 250,
        maxFilesize: 5,
        addRemoveLinks: true,
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null
        }
      },
      aiResponse: 'Does the AI things you are beautiful ?'
    }
  },
  created() {
    this.dropzoneOptions.url = axios.defaults.baseURL + '/image-recognition'
  },
  methods: {
    uploadSucceded(file, response) {
      this.aiResponse = response['result']
    },
    fileDeleted() {
      this.aiResponse = 'Does the AI things your beautiful ?'
    }
  }
}
</script>

<style lang="scss" scoped>
.imageUpload {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#dropzone {
  min-height: 350px;
  width: 800px;
}

@media (max-width: 959px) {
  #dropzone {
    width: auto;
  }
}
.dropzone-custom-title {
  color: $secondary;
}

.subtitle {
  color: $primary;
}
</style>
