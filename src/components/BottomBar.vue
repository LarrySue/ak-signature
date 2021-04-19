<template>
  <div class="style">
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    ngaIDClick () {
      window.open(this.ngaAdress, '_blank')
    }
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: rgba(50, 50, 50, 0.4);
  }
</style>
