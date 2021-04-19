<template>
  <div class="style">
    <div class="left">{{agents[0].star + '星'}}</div>
    <div class="right">
      <agent v-for="(a, idx) in agents" :key="idx" :agent="a" class="agent" @agentClick="agentClick" />
    </div>
  </div>
</template>

<script>

import Agent from './Agent'

export default {
  props: {
    agents: Array
  },
  methods: {
    agentClick (agent) {
      this.$emit('agentClick', agent)
    }
  },
  components: {
    Agent
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 24px;
  }
  .left {
    width: 45px;
  }
  .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .agent {
    height: 100px;
    width: 68px;
    margin: 0px;
    margin-left: 15px;
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>
