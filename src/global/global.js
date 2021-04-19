export default class Global {
  static AgentClass = {
    /** 先锋 */
    VANGUARD: 0,
    /** 狙击 */
    SNIPER: 1,
    /** 近卫 */
    GUARD: 2,
    /** 术师 */
    CASTER: 3,
    /** 医疗 */
    MEDIC: 4,
    /** 重装 */
    DEFENDER: 5,
    /** 辅助 */
    SUPPORTER: 6,
    /** 特种 */
    SPECIALIST: 7
  }

  static AgentType = {
    /** 主力 */
    MAIN: 0,
    /** 最爱 */
    FAVOURITE: 1,
    /** 功勋 */
    MERITORIOUS: 2
    /** 桃了 */
    // PLEASE: 3
  }

  /** 本地存储 */
  static Key = {
    /** 已选干员 */
    SELECTED_AGENT: 'SelectedAgent',
    /** 玩家信息 */
    PLAYER_INFO: 'PlayerInfo'
  }
}
