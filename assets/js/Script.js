export default class Script {
  /**
   * Creates a script to run with the given method.
   * The method can take two parameters:
   *  script - The Script instance running the method.
   *  engine - The Centauri class.
   * @param {function} runScript Default: null.
   * @param {function} isEnabled Default: true.
   */
  constructor(runScript, isEnabled = true) {
    this.run = runScript ?? null
    this._isEnabled = isEnabled
  }
  
  get isEnabled() {
    return this._isEnabled
  }
  
  set isEnabled(value) {
    this._isEnabled = value
    this.filterScripts(this.isPreRender)
  }
}
