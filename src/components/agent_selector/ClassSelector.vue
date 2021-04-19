<template>
  <div class="style">
    <div
    v-for="(c, idx) in classList"
    :key="idx"
    class="btn"
    :class="{selectedBtn: selectedIdx === idx}"
    @click="classBtnClick(idx)"
    >
      <img :src="getClassIconURL(c)" class="icon" />
    </div>
  </div>
</template>

<script>

import Global from '../../global/global.js'
import Function from '../../global/function'

export default {
  data () {
    return {
      selectedIdx: 0,
      classList: [
        Global.AgentClass.VANGUARD,
        Global.AgentClass.SNIPER,
        Global.AgentClass.GUARD,
        Global.AgentClass.CASTER,
        Global.AgentClass.MEDIC,
        Global.AgentClass.DEFENDER,
        Global.AgentClass.SUPPORTER,
        Global.AgentClass.SPECIALIST
      ]
    }
  },
  methods: {
    classBtnClick (idx) {
      if (idx !== this.selectedIdx) {
        this.selectedIdx = idx
        this.$emit('classBtnClick', this.classList[idx])
      }
    },
    getClassIconURL (agentClass) {
      return Function.getClassIconURL(agentClass)
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
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 40px;
    width: 100%;
    margin: 2px;
    opacity: 0.4;
  }
  .selectedBtn {
    background-color: rgba(50, 50, 50, 0.85);
    opacity: 1;
    border-radius: 8px;
  }
  .icon {
    height: 20px;
  }
</style>
