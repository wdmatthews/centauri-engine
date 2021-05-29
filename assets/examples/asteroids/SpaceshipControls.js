export default class SpaceshipControls {
  /**
   * Creates new spaceship controls with the given key values.
   * @param {string} forward Default: 'w'.
   * @param {string} left Default: 'a'.
   * @param {string} right Default: 'd'.
   * @param {string} fire Default: 's'.
   */
  constructor(forward, left, right, fire) {
    this.forward = forward ?? 'w'
    this.left = left ?? 'a'
    this.right = right ?? 'd'
    this.fire = fire ?? 's'
  }
}
