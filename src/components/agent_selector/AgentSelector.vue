<template>
  <div class="style">
    <class-selector class="classSelector" @classBtnClick="classBtnClick" />
      <div class="sections">
        <agent-section v-for="(agents, idx) in agentsWithClass" :key="idx" :agents="agents" @agentClick="agentClick" />
      </div>
  </div>
</template>

<script>

import Global from '../../global/global.js'
import ClassSelector from './ClassSelector'
import AgentSection from './AgentSection'

export default {
  props: {
    agents: Array
  },
  data () {
    return {
      selectedClass: Global.AgentClass.VANGUARD
    }
  },
  computed: {
    agentsWithClass () {
      let object = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': []
      }

      this.agents.forEach(agent => {
        if (agent.class === this.selectedClass) {
          object[agent.star].push(agent)
        }
      })

      let array = []

      array.push(object['6'])
      array.push(object['5'])
      array.push(object['4'])
      array.push(object['3'])
      array.push(object['2'])
      array.push(object['1'])

      return array.filter((a) => { return a.length !== 0 })
    }
  },
  components: {
    ClassSelector,
    AgentSection
  },
  methods: {
    classBtnClick (agentClass) {
      this.selectedClass = agentClass
    },
    agentClick (agent) {
      this.$emit('agentClick', agent)
    }
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .classSelector {
    height: 40px;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .sections {
    overflow-y: scroll;
    width: 100%;
  }
</style>
