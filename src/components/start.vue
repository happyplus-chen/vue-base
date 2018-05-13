<template>
  <div>
    <div class="header">

    </div>
    <div class="contanier">
      <component :is="current"></component>
    </div>
  </div>
</template>
<script>
import hInput from '../../packages/input'
import eInput from '../../packages/input-e'
export default {
  components: { hInput, eInput },
  data() {
    return {
      current: 'eInput'
    }
  }
}
</script>

<style scoped>
.contanier {
  width: 200px;
  margin: auto;
  top: 300px;
  position: relative;
}
</style>
