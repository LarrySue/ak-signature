export default class Function {
  /** 判断对象是否为空 */
  /* "number",
   * "string",
   * "boolean",
   * "object",
   * "function",
   * "date",
   * "undefined"
   */
  static equalNull = (object) => {
    return (
      object === null ||
      typeof (object) === 'undefined' ||
      (typeof (object) === 'number' && isNaN(object)) ||
      (typeof (object) === 'string' && object.length === 0)
    )
  }

  /** GTMDNAN */
  static handleNaN = (number) => {
    if (typeof (number) === 'number') {
      if (isNaN(number)) {
        return 0
      } else {
        return number
      }
    } else {
      return Function.handleNaN(Number(number))
    }
  }

  static simplifyAgent (agent) {
    let simplifiedAgent = {}

    simplifiedAgent.id = agent.id
    simplifiedAgent.name = agent.name
    simplifiedAgent.class = agent.class
    simplifiedAgent.star = agent.star
    simplifiedAgent.isSelected = agent.isSelected
    simplifiedAgent.type = agent.type
    simplifiedAgent.skins = agent.skins
    simplifiedAgent.selectedSkin = agent.selectedSkin
    simplifiedAgent.potential = agent.potential
    simplifiedAgent.elite = agent.elite
    simplifiedAgent.lv = agent.lv
    simplifiedAgent.skillRank = agent.skills.map(o => { return o.rank })

    return simplifiedAgent
  }

  static getClassIconURL (agentClass) {
    return '/static/image/class/' + agentClass + '.png'
  }

  static getStarIconURL (star) {
    return '/static/image/star/' + star + '.png'
  }

  static getTypeIconURL (type) {
    return '/static/image/type/' + type + '.png'
  }

  static getEliteIconURL (elite) {
    return '/static/image/elite/' + elite + '.png'
  }

  static getPotentialIconURL (potential) {
    return '/static/image/potential/' + potential + '.png'
  }

  static getSkillRankIconURL (skillRank) {
    return '/static/image/skillRank/' + skillRank + '.png'
  }

  static getAgentAvatarURL (agent) {
    let id = agent.id
    let star = agent.star
    let elite = agent.elite
    let selectedSkin = agent.selectedSkin

    if (this.equalNull(id) || this.equalNull(star) || this.equalNull(elite) || this.equalNull(selectedSkin)) { return }

    let avatar = 1

    if (selectedSkin !== -1) {
      avatar = selectedSkin
    } else {
      if (id === 99040001) {
        avatar = elite
      } else {
        avatar = elite === 2 ? 2 : 1
      }
    }

    return '/static/image/agent/avatar/' + star + '/' + id + '/' + avatar + '.png'
  }
}
