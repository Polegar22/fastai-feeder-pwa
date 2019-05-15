<template>
  <v-list dense class="pt-0">
    <v-list-tile
      v-for="item in items"
      :key="item.title"
      @click="goTo(item.path)"
    >
      <v-list-tile-action>
        <v-icon large>
          {{ item.icon }}
        </v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>
          {{ item.title }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Home', path: '/', icon: 'home' },
        {
          title: 'CNN Image Recognition',
          path: 'image-recognition',
          icon: 'image_search'
        },
        {
          title: 'CNN Sound Detection',
          path: 'sound-detection',
          icon: 'hearing'
        },
        {
          title: 'Natural Language Processing',
          path: 'nlp',
          icon: 'notes'
        },
        {
          title: 'Unet Image reconstruction',
          path: 'image-reconstruction',
          icon: 'picture_in_picture'
        }
      ]
    }
  },
  methods: {
    goTo(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
