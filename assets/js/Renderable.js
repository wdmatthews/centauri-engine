export default class Renderable {
  /**
   * Creates a new renderable with the given visibility, sorting layer, and camera targets.
   * @param {boolean} isVisible Default: true.
   * @param {number} sortingLayer Default: 0.
   * @param {string[]} cameraTargets Default: ['main'].
   */
  constructor(isVisible, sortingLayer, cameraTargets) {
    this._isVisible = isVisible ?? true
    this._sortingLayer = sortingLayer ?? 0
    this._cameraTargets = cameraTargets ?? ['main']
  }
  
  get isVisible() {
    return this._isVisible
  }
  
  set isVisible(value) {
    this._isVisible = value
    this.filterRenderables()
  }
  
  get sortingLayer() {
    return this._sortingLayer
  }
  
  set sortingLayer(value) {
    this._sortingLayer = value
    this.orderRenderables()
  }
  
  get cameraTargets() {
    return this._cameraTargets
  }
  
  set cameraTargets(value) {
    this._cameraTargets = value
    this.filterRenderables()
  }
}
