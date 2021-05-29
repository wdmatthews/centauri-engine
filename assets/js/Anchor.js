import Vector from './Vector.js'

export default class Anchor {
  /**
   * Creates a new anchor point.
   * @param {Vector} parentPosition Default: new Vector(0, 0).
   * @param {Vector} position Default: new Vector(0, 0).
   * @param {number} angle Default: 0.
   * @param {Vector} scale Default: new Vector(1, 1).
   */
  constructor(parentPosition, position, angle, scale) {
    this.parentPosition = parentPosition ?? new Vector()
    this.position = position ?? new Vector()
    this.angle = angle ?? 0
    this.scale = scale ?? new Vector(1, 1)
  }
}
