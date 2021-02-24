<template>
  <div id="app" class="container mx-auto lg:w-2/5 sm:w-1/2 border border-gray-200 rounded-xl p-2">
    <thing-list></thing-list>
  </div>
</template>

<script>
import ThingList from './components/ThingList'

export default {
  name: 'App',
  components: {
    ThingList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
