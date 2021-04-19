<template>
  <div class="style">
    <div class="top">
      <img :src="classIconURL" class="icon">
    </div>
    <div class="main">
      <div v-for="(a, idx) in agents" :key="idx" class="agent" :style="{marginLeft: (idx % column === 0) ? '0px' : '15px'}">
        <img :src="getAgentAvatarURL(a)" class="avatar" />
        <div class="bottom">
          <img :src="getEliteIconURL(a.elite)" class="elite" />
          <div class="lv">{{'Lv' + a.lv}}</div>
          <div v-if="a.elite === 2" class="rank">
            <img v-for="(r, idx) in a.skillRank" :key="idx" :src="getSkillRankIconURL(r)" class="rankIcon" />
          </div>
        </div>
        <img :src="getPotentialIconURL(a.potential)" class="potential" />
      </div>
    </div>
  </div>
</template>

<script>

import Global from '../../global/global'
import Function from '../../global/function'

export default {
  props: {
    agents: Array,
    column: Number
  },
  computed: {
    classIconURL () {
      if (this.agents[0].type === Global.AgentType.MAIN) {
        return Function.getClassIconURL(this.agents[0].class)
      } else {
        return Function.getTypeIconURL(this.agents[0].type)
      }
    }
  },
  methods: {
    getAgentAvatarURL (agent) {
      return Function.getAgentAvatarURL(agent)
    },
    getPotentialIconURL (potential) {
      return Function.getPotentialIconURL(potential)
    },
    getEliteIconURL (elite) {
      return Function.getEliteIconURL(elite)
    },
    getSkillRankIconURL (rank) {
      return Function.getSkillRankIconURL(rank)
    }
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    height: 80px;
  }
  .icon {
    width: 35px;
    height: 35px;
  }
  .main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
  }
  .agent {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 85px;
    height: 105px;
    background-color: rgba(170, 170, 170, 0.7);
    border-radius: 3px;
  }
  .potential {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    right: 0px;
    background-color: rgb(40, 40, 40);
  }
  .avatar {
    width: 85px;
    height: 85px;
  }
  .bottom {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 85px;
    height: 20px;
    background-color: rgb(40, 40, 40);
  }
  .elite {
    width: 16px;
    height: 12px;
    opacity: 0.8;
    margin-left: 1px;
  }
  .lv {
    font-size: 10px;
    color: rgb(190, 190, 190);
    margin-left: 1px;
  }
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-left: auto;
    margin-right: 2px;
  }
  .rankIcon {
    width: 9px;
    height: 9px;
    margin-left: 2px;
  }
</style>
