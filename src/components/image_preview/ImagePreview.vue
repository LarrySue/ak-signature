<template>
  <div class="style">
    <div class="previewArea">
      <div class="previewMain" :style="size" id="previewImage">
        <div class="bgImg" :style="size">
          <div class="mask" :style="size">

            <div class="nameArea" :style="{height: topHeight + 'px'}">
              <div v-if="playerInfo.name.length !== 0" class="namePad" :style="{marginLeft: marginLeft + 'px'}">
                <div class="title">{{playerInfo.name}}</div>
                <div v-if="playerInfo.server !== '0'" class="server">{{getServerName(playerInfo.server)}}</div>
              </div>
              <div v-if="playerInfo.sign.length !== 0" class="subtitle" :style="{marginLeft: marginLeft + 2 + 'px'}">{{playerInfo.sign}}</div>
            </div>

            <preview-section v-if="favouriteAgents.length !== 0" :agents="favouriteAgents" :column="column" :style="{height: favouriteHeight + 'px', marginLeft: marginLeft + 'px', marginRight: marginRight + 'px'}" />

            <div v-if="mainAgents.length !== 0" class="mainArea" :style="{height: mainHeight + 'px', marginLeft: marginLeft + 'px', marginRight: marginRight + 'px'}">
              <preview-section v-for="(as, idx) in mainAgents" :key="idx" :agents="as.as" :column="as.as.length" :style="{height: (agentSectionTopHeight + agentHeight + agentYPadding) + 'px', marginLeft: as.marginLeft + 'px'}"/>
            </div>

            <preview-section v-if="meritoriousAgents.length !== 0" :agents="meritoriousAgents" :column="column" :style="{height: meritoriousHeight + 'px', marginLeft: marginLeft + 'px', marginRight: marginRight + 'px'}" />
          </div>
        </div>
      </div>
    </div>

    <img src="/static/image/other/close.png" @click="closeBtnClick" class="closeBtn" />
    <img src="/static/image/other/download.png" @click="downloadBtnClick" class="downloadBtn" />
  </div>
</template>

<script>
import PreviewSection from './PreviewSection'
import html2canvas from 'html2canvas'
import Global from '../../global/global'

export default {
  data () {
    return {
      width: 0,
      height: 0,

      column: 0,

      topHeight: 75,
      bottomHeight: 75,

      marginLeft: 120,
      marginRight: 120,

      agentWidth: 85,
      agentHeight: 105,
      agentXPadding: 15,
      agentYPadding: 25,
      agentSectionTopHeight: 80,

      favouriteAgents: [],
      mainAgents: [],
      meritoriousAgents: [],

      favouriteHeight: 0,
      mainHeight: 0,
      meritoriousHeight: 0
    }
  },
  props: {
    playerInfo: Object,
    agents: Array
  },
  computed: {
    size () {
      this.calculateVariousSize()

      return {
        'width': this.width + 'px',
        'height': this.height + 'px'
      }
    }
  },
  methods: {
    closeBtnClick () {
      this.$emit('closeBtnClick')
    },
    downloadBtnClick () {
      html2canvas(document.querySelector('#previewImage')).then((canvas) => {
        let image = canvas.toDataURL()

        let saveLink = document.createElement('a')
        saveLink.href = image
        saveLink.download = '签名图'

        let clickEvent = document.createEvent('MouseEvents')
        clickEvent.initEvent('click', true, false)
        saveLink.dispatchEvent(clickEvent)
      })
    },
    getServerName (s) {
      switch (s) {
        case '0':
          return ''
        case '1':
          return '官服'
        case '2':
          return 'B服'
        default:
          return ''
      }
    },
    calculateVariousSize () {
      if (this.playerInfo.name.length !== 0 || this.playerInfo.sign.length !== 0) {
        this.topHeight = 250
      }

      this.agents.sort((a1, a2) => {
        if (a1.star !== a2.star) {
          return a2.star - a1.star
        } else if (a1.elite !== a2.elite) {
          return a2.elite - a1.elite
        } else if (a1.lv !== a2.lv) {
          return a2.lv - a1.lv
        } else {
          return a1.class - a2.class
        }
      })

      this.favouriteAgents = this.agents.filter(e => {
        return e.type === Global.AgentType.FAVOURITE
      })
      this.meritoriousAgents = this.agents.filter(e => {
        return e.type === Global.AgentType.MERITORIOUS
      })

      let AgentSectionsWithClass = [
        [], [], [], [], [], [], [], []
      ]

      this.agents.filter(e => {
        return e.type === Global.AgentType.MAIN
      }).forEach(e => {
        AgentSectionsWithClass[e.class].push(e)
      })

      AgentSectionsWithClass = AgentSectionsWithClass.filter(arr => { return arr.length > 0 })
      AgentSectionsWithClass.sort((arr1, arr2) => { return arr2.length - arr1.length })

      this.column = AgentSectionsWithClass[0].length

      if (this.column !== 0) {
        if (this.column < 5) { this.column = 5 }

        let AgentSectionsWithLength = []
        let flag = false

        for (let i = 0; i < AgentSectionsWithClass.length; i++) {
          const arrI = AgentSectionsWithClass[i]

          for (let j = 0; j < AgentSectionsWithLength.length; j++) {
            const arrJ = AgentSectionsWithLength[j]
            let countSum = 0

            for (let k = 0; k < arrJ.length; k++) {
              countSum += arrJ[k].length
              if (k > 0) { countSum += 1 }
            }

            if (countSum + arrI.length + 1 <= this.column) {
              arrJ.push(arrI)
              flag = true
              break
            }
          }

          if (!flag) {
            AgentSectionsWithLength.push([arrI])
          }
        }

        AgentSectionsWithLength.sort((a1, a2) => {
          let sum1 = 0
          let sum2 = 0

          a1.forEach(a => { sum1 += a.length })
          a2.forEach(a => { sum2 += a.length })

          sum1 += a1.length - 1
          sum2 += a2.length - 1

          return sum2 - sum1
        })

        let resultAgents = []
        for (let i = 0; i < AgentSectionsWithLength.length; i++) {
          const arrI = AgentSectionsWithLength[i]
          for (let j = 0; j < arrI.length; j++) {
            const arrJ = arrI[j]
            resultAgents.push({
              marginLeft: j === 0
                ? 0
                : this.agentWidth + 2 * this.agentXPadding,
              as: arrJ
            })
          }
        }
        this.mainAgents = resultAgents

        this.mainHeight = AgentSectionsWithLength.length * (this.agentSectionTopHeight + this.agentHeight + this.agentYPadding)
      } else {
        this.column = Math.max(
          this.favouriteAgents.length === 0 ? 10 : this.favouriteAgents.length,
          this.meritoriousAgents.length === 0 ? 10 : this.meritoriousAgents.length
        )

        if (this.column > 10) { this.column = 10 }
        if (this.column < 5) { this.column = 5 }
      }

      if (this.favouriteAgents.length !== 0) {
        let fRow = Math.ceil(this.favouriteAgents.length / 10.0)
        this.favouriteHeight = this.agentSectionTopHeight + fRow * (this.agentHeight + this.agentYPadding)
      }

      if (this.meritoriousAgents.length !== 0) {
        let mRow = Math.ceil(this.meritoriousAgents.length / 10.0)
        this.meritoriousHeight = this.agentSectionTopHeight + mRow * (this.agentHeight + this.agentYPadding)
      }

      this.width = this.marginLeft + this.marginLeft + this.column * this.agentWidth + (this.column - 1) * this.agentXPadding
      this.height = this.topHeight + this.favouriteHeight + this.mainHeight + this.meritoriousHeight + this.bottomHeight
    }
  },
  components: {
    PreviewSection
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .previewArea {
    width: 80%;
    height: 80%;
    overflow: scroll;
  }
  .previewMain {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bgImg {
    background-image: url('/static/image/bg.jpeg');
    background-position: center;
    background-size: cover;
    z-index: 0;
  }
  .mask {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
  .nameArea {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .namePad {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .title {
    font-size: 45px;
    font-weight: 600;
    color: white
  }
  .server {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 34px;
    background-color: rgb(120, 120, 120);
    color: white;
    border-radius: 8px;
    margin-left: 25px;
  }
  .subtitle {
    font-size: 20px;
    color: rgb(133, 133, 133);
    margin-top: 15px;
  }
  .mainArea {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .closeBtn {
    position: absolute;
    width: 50px;
    opacity: 0.5;
    top: 50px;
    right: 50px;
    z-index: 5;
  }
  .downloadBtn {
    position: absolute;
    width: 50px;
    opacity: 0.5;
    top: 150px;
    right: 50px;
    z-index: 5;
  }
</style>
