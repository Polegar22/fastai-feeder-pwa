<template>
  <div class="audioUpload">
    <h2>{{ aiResponse }}</h2>
    <audio-recorder
      style="margin-top:30px"
      :upload-url="url"
      :attempts="1"
      :time="0.08"
      :show-download-button="false"
      :headers="headers"
      :successful-upload="uploadSucceded"
    />
  </div>
</template>

<script>
import axios from '@/services/api'

export default {
  name: 'UploadSound',
  data: function() {
    return {
      aiResponse: 'Upload a sound.',
      url: '',
      headers: {
        'Cache-Control': null,
        'X-Requested-With': null
      }
    }
  },
  created() {
    this.url = axios.defaults.baseURL + '/sound-detection'
  },
  methods: {
    uploadSucceded(response) {
      this.aiResponse = response.data['result']
    }
  }
}
</script>

<style lang="scss">
.audioUpload {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 600px) {
  .ar {
    width: 300px !important;

    .ar-content {
      .ar-records .ar-records__record {
        width: 190px;
      }

      .ar-player {
        width: 300px;
        .ar-player-bar {
          display: none;
        }
      }
    }
  }
}
</style>
