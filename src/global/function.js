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
      (typeof (object) === 'string' && object.length === 0) ||
      (Array.isArray(object) && object.length === 0)
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
    simplifiedAgent.type = agent.type
    simplifiedAgent.lv = agent.lv
    simplifiedAgent.potential = agent.potential
    simplifiedAgent.elite = agent.elite
    simplifiedAgent.skillRank = agent.skills.map(o => { return o.rank })
    simplifiedAgent.isSelected = agent.isSelected

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
    let name = agent.name

    if (this.equalNull(name)) { return }

    if (name.startsWith('阿米娅')) {
      if (agent.elite === 2) {
        return '/static/image/agent/avatar/amiya/' + name + '.png'
      } else {
        return '/static/image/agent/avatar/amiya/阿米娅' + agent.elite + '.png'
      }
    } else if (agent.elite < 2) {
      return '/static/image/agent/avatar/' + agent.star + '/1/' + name + '.png'
    } else {
      return '/static/image/agent/avatar/' + agent.star + '/2/' + name + '.png'
    }
  }
}
