<template>
  <div>
    <div class="header">

    </div>
    <div class="contanier">
      <component :is="current"></component>

    </div>
     <component :is="Breadcrumbs"></component>
  </div>
</template>
<script>
import hInput from '../../packages/input'
import eInput from '../../packages/input-e'
import Breadcrumbs from '../../packages/Breadcrumbs'
export default {
  components: { hInput, eInput, Breadcrumbs },
  data() {
    return {
      current: 'eInput',
      Breadcrumbs: 'Breadcrumbs'
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
