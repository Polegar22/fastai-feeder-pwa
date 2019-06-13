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
    <span class="disclaimer">
      Disclaimer : This model is trained with the first 200 results of Google
      images for "beautiful man and beautiful woman", so this is
      <span class="important-text">totally bias</span> ! I did this model to see
      how a classification model would perform on such a subjective task.
      Because a man with a beard can be beautiful but a woman with a beard ...
      not so much. It means that the model had to understand that the "standard
      of beauty" (according to my totally biased dataset) are not the same for a
      man and a woman.
    </span>
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

.disclaimer {
  width: 500px;
  margin: 25px;
  color: grey;

  .important-text {
    font-weight: bold;
    font-size: 1.3em;
  }
}

@media (max-width: 959px) {
  #dropzone {
    width: auto;
  }

  .disclaimer {
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
