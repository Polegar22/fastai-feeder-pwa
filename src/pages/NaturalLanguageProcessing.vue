<template>
  <div class="nlpUpload">
    <custom-title
      title="John Danaher Generator"
      subtitle="AI will complete your sentence in the style of John Danaher"
    />
    <div>
      <div class="nlpInputs">
        <v-text-field v-model="entryText" label="Entry Text" />
        <v-text-field v-model="nbWords" label="Number of words" />
        <v-slider
          v-model="randomness"
          label="Randomness"
          thumb-label="always"
        />
      </div>
      <v-btn
        v-show="entryText && !sending"
        color="accent"
        @click="sendEntryText"
      >
        Send
      </v-btn>
      <v-progress-circular v-show="sending" indeterminate color="accent" />
    </div>
    <span v-if="danaherText" class="danaherText">
      {{ danaherText }}
    </span>
  </div>
</template>

<script>
import axios from '@/services/api'
import CustomTitle from '@/components/CustomTitle'

export default {
  components: {
    CustomTitle
  },
  data: function() {
    return {
      danaherText: '',
      entryText: '',
      nbWords: 45,
      randomness: 50,
      sending: false
    }
  },
  computed: {
    percentRdm() {
      return this.randomness / 100
    }
  },
  methods: {
    sendEntryText() {
      this.sending = true
      this.danaherText = ''
      let formData = new FormData()
      formData.append('entry_text', this.entryText)
      formData.append('nb_words', this.nbWords)
      formData.append('randomness', this.percentRdm)

      axios.post('/nlp', formData).then(response => {
        this.danaherText = response.data['result']
        this.sending = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nlpUpload {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}

.nlpInputs {
  margin-top: 30px;
}

.danaherText {
  max-width: 500px;
  margin-top: 30px;
}
</style>
