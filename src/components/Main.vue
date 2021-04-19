<template>
  <div class="style">
    <div class="bg">
      <div class="mask"/>
    </div>

    <div class="main">
      <top-bar class="topBar" />
      <div class="center">
        <agent-detail class="detail" :agent="selectedAgent" @agentChanged="agentChanged"/>
        <div class="right">
          <agent-selector class="selector" :agents="agents" @agentClick="agentClick" />
          <div class="bottomBar">
            <select class="serverSlc" v-model="playerInfo.server">
              <option value="0">不显示</option>
              <option value="1">官服</option>
              <option value="2">B服</option>
            </select>
            <input type="text" placeholder="Dr.xxx#xxx" class="nameIpt" v-model="playerInfo.name">
            <input type="text" placeholder="此处填写签名" class="signIpt" v-model="playerInfo.sign">
            <div class="previewBtn" @click="previewBtnClick">预览</div>
          </div>
        </div>
      </div>
    </div>

    <image-preview v-if="showPreview" class="preview" :show="showPreview" :playerInfo="playerInfo" :agents="selectedAgents" @closeBtnClick="closeBtnClick"/>
  </div>
</template>

<script>

import TopBar from './TopBar'
import BottomBar from './BottomBar'
import AgentDetail from './agent_detail/AgentDetail'
import AgentSelector from './agent_selector/AgentSelector'
import ImagePreview from './image_preview/ImagePreview'

import Global from '../global/global'
import Function from '../global/function'

export default {
  data () {
    return {
      agents: [],
      selectedAgent: {},
      selectedAgents: [],
      playerInfo: {},
      showPreview: false
    }
  },
  methods: {
    agentChanged (agent) {
      let simplifiedAgent = Function.simplifyAgent(agent)

      let idx = this.selectedAgents.findIndex(a => {
        return a.id === simplifiedAgent.id
      })

      if (idx === -1) {
        this.selectedAgents.push(simplifiedAgent)
      } else if (!simplifiedAgent.isSelected) {
        this.selectedAgents.splice(idx, 1)
      } else {
        this.selectedAgents.splice(idx, 1, simplifiedAgent)
      }

      localStorage.setItem(Global.Key.SELECTED_AGENT, JSON.stringify(this.selectedAgents))
    },
    agentClick (agent) {
      this.selectedAgent = agent

      if (!agent.isSelected) {
        agent.isSelected = true

        this.agentChanged(agent)
      }
    },
    previewBtnClick () {
      localStorage.setItem(Global.Key.PLAYER_INFO, JSON.stringify(this.playerInfo))

      this.showPreview = true
    },
    closeBtnClick () {
      this.showPreview = false
    }
  },
  mounted () {
    this.playerInfo = JSON.parse(localStorage.getItem(Global.Key.PLAYER_INFO))

    if (Function.equalNull(this.playerInfo)) {
      this.playerInfo = {
        server: '1',
        name: '',
        sign: ''
      }
    }

    this.selectedAgents = JSON.parse(localStorage.getItem(Global.Key.SELECTED_AGENT))

    if (Function.equalNull(this.selectedAgents)) {
      this.selectedAgents = []
    }

    this.agents = require('../../static/data/agent.json').agents

    this.selectedAgents.forEach(simplifiedAgent => {
      let agent = this.agents.find(a => {
        return a.id === simplifiedAgent.id
      })

      if (agent) {
        agent.type = simplifiedAgent.type
        agent.lv = simplifiedAgent.lv
        agent.potential = simplifiedAgent.potential
        agent.elite = simplifiedAgent.elite

        agent.skills.forEach((s, idx) => {
          s.rank = simplifiedAgent.skillRank[idx]
        })

        agent.isSelected = simplifiedAgent.isSelected
      }
    })

    this.agentClick(this.agents[1])
  },
  components: {
    TopBar,
    BottomBar,
    AgentDetail,
    AgentSelector,
    ImagePreview
  }
}
</script>

<style scoped>
  .style {
    color: rgb(233, 233, 233);
  }
  .bg {
    background-image: url('/static/image/bg.jpeg');
    background-position: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: blur(8px);
    z-index: -1;
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color:  rgb(100, 100, 100);
    opacity: 0.5;
    z-index: 1;
  }
  .main {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 95vh;
    width: 100%;
  }
  .topBar {
    /* top: 0px; */
    height: 5vh;
    width: 100%;
  }
  .detail {
    height: 100%;
    width: 40%;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 60%;
  }
  .selector {
    height: 80%;
    width: 100%;
  }
  .bottomBar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 20%;
    width: 100%;
  }
  .serverSlc {
    font-size: 16px;
    height: 35px;
    width: 70px;
    border: none;
    box-shadow: 0px, 0px, 0px, 0px;
    border-radius: 8px;
    color: rgb(233, 233, 233);
    background-color: rgba(40, 40, 40);
  }
  .nameIpt {
    text-align: center;
    font-size: 16px;
    height: 35px;
    width: 150px;
    border: none;
    box-shadow: 0px, 0px, 0px, 0px;
    border-radius: 8px;
    color: rgb(233, 233, 233);
    background-color: rgba(40, 40, 40);
    margin-left: 20px;
  }
  .signIpt {
    text-align: center;
    font-size: 14px;
    height: 35px;
    width: 200px;
    border: none;
    box-shadow: 0px, 0px, 0px, 0px;
    border-radius: 8px;
    color: rgb(233, 233, 233);
    background-color: rgba(40, 40, 40);
    margin-left: 20px;
  }
  .previewBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 45px;
    border-radius: 8px;
    background-color: rgba(183, 183, 183);
    color: rgb(50, 50, 50);
    margin-left: 20px;
  }
  .preview {
    background-color: rgba(50, 50, 50, 0.8);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>
