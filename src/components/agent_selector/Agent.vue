<template>
  <div class="style" :class="{selected: agent.isSelected}">
    <div class="top" :style="{opacity: (agent.isSelected === true) ? 1 : 0}">
      <img :src="getEliteIconURL(agent.elite)" style="width: 15px" />
      <div style="margin-left: 3px; margin-right: 3px; font-size: 10pt" >Lv{{agent.lv}}</div>
      <img :src="getPotentialIconURL(agent.potential)" style="width: 15px" />
    </div>

    <img :src="getAgentAvatarURL(agent)" class="avatar" :class="{selectedAvatar: agent.isSelected}" @click="agentClick" />

    <div class="bottom" :style="{opacity: (agent.isSelected === true) ? 1 : 0}">
      <img :src="getTypeIconURL(agent.type)" style="width: 12px" />
      <div v-if="agent.star > 3" >
        <img v-for="(s, idx) in agent.skills" :key="idx" :src="getSkillRankIconURL(s.rank)" style="width: 10px; margin-left: 5px"/>
      </div>
    </div>
  </div>
</template>

<script>

import Function from '../../global/function'

export default {
  props: {
    agent: Object
  },
  methods: {
    agentClick () {
      this.$emit('agentClick', this.agent)
    },
    getAgentAvatarURL (agent) {
      return Function.getAgentAvatarURL(agent)
    },
    getEliteIconURL (elite) {
      return Function.getEliteIconURL(elite)
    },
    getPotentialIconURL (potential) {
      return Function.getPotentialIconURL(potential)
    },
    getTypeIconURL (type) {
      return Function.getTypeIconURL(type)
    },
    getSkillRankIconURL (skillRank) {
      return Function.getSkillRankIconURL(skillRank)
    }
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0.4;
  }
  .selected {
    opacity: 1;
    background-color: rgba(50, 50, 50, 0.75);
    border-radius: 5px;
  }
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 15%;
    margin-top: 2px;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 18%;
  }
  .avatar {
    height: 67%;
    background-color: rgba(50, 50, 50, 0.65);
    border-radius: 5px;
  }
  .selectedAvatar {
    background-color: rgba(50, 50, 50, 0);
    border-radius: 0px;
  }
</style>
