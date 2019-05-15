<template>
  <v-app>
    <div id="app">
      <header>
        <v-btn flat dark icon class="btn-drawer" @click="openDrawer = true">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-navigation-drawer
          v-model="openDrawer"
          absolute
          temporary
          class="drawer"
        >
          <Menu />
        </v-navigation-drawer>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'App',
  components: {
    Menu
  },
  data() {
    return {
      openDrawer: false
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: $primary;
  color: #ffffff;
  display: flex;
  align-items: center;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
