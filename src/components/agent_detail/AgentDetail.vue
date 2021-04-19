<template>
  <div class="style" :style="{opacity: (agent.isSelected === true) ? 1 : 0}">

    <!-- 头像 名字 职业 星级 -->
    <div class="baseInfoArea">
      <div class="baseInfoLeft">
        <img :src="getAgentAvatarURL(agent)" class="avatar">
      </div>

      <div class="baseInfoRight">
        <div class="name">{{agent.name}}</div>
        <div class="classAndStar">
          <img :src="getClassIconURL(agent.class)" style="height: 25px; width: 25px">
          <img :src="getStarIconURL(agent.star)" style="height: 25px; margin-left: 15px">
        </div>
      </div>
    </div>

    <!-- 干员类型: 主力 老婆 功勋 -->
    <div class="typeArea">
      <div
      v-for="t in typeList"
      :key="t"
      :title="typeTitleList[t]"
      class="typeBtn"
      :class="{selectedTypeBtn: agent.type === t}"
      @click="typeBtnClick(t)"
      >
        <img :src="getTypeIconURL(t)" style="height: 20px; width: 20px" />
      </div>
    </div>

    <!-- 潜能 -->
    <div v-if="agent.type != 3" class="potential">
      <div
      v-for="p in potentialList"
      :key="p"
      class="potentialBtn"
      :class="{selectedPotentialBtn: agent.potential === p}"
      @click="potentialBtnClick(p)"
      >
        <img :src="getPotentialIconURL(p)" style="height: 30px; width: 30px" />
      </div>
    </div>

    <!-- 精英化 -->
    <div v-if="agent.star > 2 && agent.type != 3" class="elite">
      <div
      v-for="e in eliteList"
      :key="e"
      class="eliteBtn"
      :class="{selectedEliteBtn: agent.elite === e}"
      @click="eliteBtnClick(e)"
      >
        <img :src="getEliteIconURL(e)" style="height: 20px; width: 28px" />
      </div>
    </div>

    <!-- 等级 -->
    <div v-if="agent.type != 3" class="lv">
      <div class="lvlTips">Lv.</div>
      <input class="lvlIpt" type="number" :value="agent.lv" @input="lvInput" @blur="lvBlur" ref="lvlInput"/>
      <div class="lvlMaxBtn" @click="lvMaxBtnClick">Max</div>
    </div>

    <!-- 技能 -->
    <div v-if="agent.star > 3 && agent.type != 3 && agent.elite >= 2" class="skill">
      <div v-for="(s, i) in agent.skills" :key="i" class="skillCell">
        <div class="skillName">
          <div>{{s.name}}</div>
        </div>
        <div class="skillRank">
          <div
          v-for="r in rankList"
          :key="r"
          class="skillRankBtn"
          :class="{selectedSkillRankBtn: s.rank === r}"
          @click="skillRankBtnClick({s, r})"
          >
            <img :src="getSkillRankIconURL(r)" style="height: 16px; width: 16px" />
          </div>
        </div>
      </div>
    </div>

    <div class="deselectedAgent" @click="deselectedAgent">
      <div style="font-size: 10pt">取消选择</div>
    </div>

  </div>
</template>

<script>

import Function from '../../global/function'
import Global from '../../global/global'

export default {
  props: {
    agent: Object
  },
  computed: {
    maxLvl () {
      let star = this.agent.star
      let elite = this.agent.elite

      if (star === 1 || star === 2) {
        return 30
      } else if (star === 3) {
        if (elite === 0) {
          return 40
        } else if (elite === 1) {
          return 55
        }
      } else if (star === 4) {
        if (elite === 0) {
          return 45
        } else if (elite === 1) {
          return 60
        } else if (elite === 2) {
          return 70
        }
      } else if (star === 5) {
        if (elite === 0) {
          return 50
        } else if (elite === 1) {
          return 70
        } else if (elite === 2) {
          return 80
        }
      } else if (star === 6) {
        if (elite === 0) {
          return 50
        } else if (elite === 1) {
          return 80
        } else if (elite === 2) {
          return 90
        }
      }
    },
    typeList () { return [0, 1, 2] },
    typeTitleList () {
      return [
        '主力干员: 从剿灭作战到危机合约, 到处活跃着TA们的身影, TA们是罗德岛上最强的精英, 是博士在任何时候都可以依靠的坚实战力',
        '爱的干员: TA是我老婆/老公这件事和强度有什么关系吗?',
        '功勋干员: 虽然TA们现在出场战斗的机会不多, 但是我们不会忘记TA们曾为罗德岛做出的贡献, 这枚勋章颁发给在开荒时期立下汗马功勋的干员们'
      ]
    },
    potentialList () { return [1, 2, 3, 4, 5, 6] },
    eliteList () {
      if (this.agent.name === '阿米娅(近卫)') {
        return [2]
      } else if (this.agent.star >= 4) {
        return [0, 1, 2]
      } else if (this.agent.star === 3) {
        return [0, 1]
      } else {
        return [0]
      }
    },
    rankList () { return [0, 1, 2, 3] }
  },
  methods: {
    agentChanged () {
      this.$emit('agentChanged', this.agent)
    },
    typeBtnClick (t) {
      this.agent.type = t

      if (t === Global.AgentType.PLEASE) {
        this.agent.elite = 0
        this.agent.lv = 1
        this.agent.potential = 1
      }

      this.agentChanged()
    },
    lvInput (e) {
      let value = e.currentTarget.value

      if (value === '') { return }

      if (value < 1) {
        value = 1
      } else if (value > this.maxLvl) {
        value = this.maxLvl
      }

      this.agent.lv = value
      this.$refs.lvlInput.value = value

      this.agentChanged()
    },
    lvBlur () {
      this.$refs.lvlInput.value = this.agent.lv
    },
    lvMaxBtnClick () {
      this.agent.elite = this.eliteList[this.eliteList.length - 1]
      this.agent.lv = this.maxLvl

      this.agentChanged()
    },
    potentialBtnClick (p) {
      this.agent.potential = p

      this.agentChanged()
    },
    eliteBtnClick (e) {
      this.agent.elite = e

      if (this.agent.lv > this.maxLvl) {
        this.agent.lv = this.maxLvl
      }

      if (e < 2) {
        this.agent.skills.forEach((s) => { s.rank = 0 })
      }

      this.agentChanged()
    },
    skillRankBtnClick ({s, r}) {
      s.rank = r

      this.agentChanged()
    },
    deselectedAgent () {
      this.agent.isSelected = false

      this.agentChanged()
    },

    getAgentAvatarURL (agent) {
      return Function.getAgentAvatarURL(agent)
    },
    getClassIconURL (agentClass) {
      return Function.getClassIconURL(agentClass)
    },
    getStarIconURL (star) {
      return Function.getStarIconURL(star)
    },
    getTypeIconURL (type) {
      return Function.getTypeIconURL(type)
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
    align-items: center;
    flex-direction: column;
  }
  .baseInfoArea {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-top: 55px;
  }
  .baseInfoLeft {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row-reverse;
    width: 50%;
  }
  .avatar {
    width: 120px;
    height: 120px;
    background-color: rgba(50, 50, 50, 0.3);
    border-radius: 8px;
  }
  .baseInfoRight {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 20px;
    width: 50%
  }
  .name {
    font-size: 30px;
    letter-spacing: 4px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .classAndStar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .typeArea {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 35px;
  }
  .typeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    margin: 5px;
    opacity: 0.4;
  }
  .selectedTypeBtn {
    background-color: rgba(50, 50, 50, 0.8);
    opacity: 1;
    border-radius: 8px;
  }
  .lv {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
  }
  .lvlTips {
    font-size: 16px;
    margin-right: 10px;
  }
  .lvlIpt {
    text-align: center;
    font-size: 16px;
    height: 25px;
    width: 55px;
    border: none;
    box-shadow: 0px, 0px, 0px, 0px;
    border-radius: 8px;
    color: rgb(233, 233, 233);
    background-color: rgba(50, 50, 50, 0.85);
  }
  .lvlMaxBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    height: 28px;
    width: 40px;
    margin-left: 15px;
    background-color: rgba(50, 50, 50, 0.4);
    border-radius: 8px;
  }
  .potential {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
  }
  .potentialBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 45px;
    margin: 5px;
    opacity: 0.4;
  }
  .selectedPotentialBtn {
    background-color: rgba(50, 50, 50, 0.85);
    opacity: 1;
    border-radius: 8px;
  }
  .elite {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
  }
  .eliteBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 55px;
    margin: 5px;
    opacity: 0.4;
  }
  .selectedEliteBtn {
    background-color: rgba(50, 50, 50, 0.85);
    opacity: 1;
    border-radius: 8px;
  }
  .skill {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
  }
  .skillCell {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin: 5px;
  }
  .skillName {
    font: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row-reverse;
    width: 45%;
  }
  .skillRank {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 55%;
    margin-left: 10px;
  }
  .skillRankBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;
    margin: 4px;
    opacity: 0.4;
  }
  .selectedSkillRankBtn {
    background-color: rgba(50, 50, 50, 0.85);
    opacity: 1;
    border-radius: 3px;
  }
  .deselectedAgent {
    background-color: rgba(50, 50, 50, 0.4);
    padding: 10px;
    margin-top: 30px;
    border-radius: 8px;
  }
</style>
