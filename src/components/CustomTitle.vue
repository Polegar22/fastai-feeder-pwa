<template>
  <div>
    <h2>{{ title }}</h2>
    <h3 class="subtitle">
      {{ subtitle }}
    </h3>
  </div>
</template>
<script>
export default {
  name: 'UploadSound',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.subtitle {
  margin-top: 15px;
  color: $secondary;
}
</style>
