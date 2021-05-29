import Vector from './Vector.js'

export default class RectangleBounds {
  /**
   * Creates rectangle bounds with the given position and size.
   * @param {Vector} position
   * @param {Vector} size
   */
  constructor(position, size) {
    this.position = position ?? new Vector()
    this.size = size ?? new Vector()
  }
  
  /**
   * Returns if this bounds overlaps `otherBounds`.
   * @param {RectangleBounds} otherBounds
   * @returns If this bounds overlaps `otherBounds`.
   */
  overlaps(otherBounds) {
    return this.position.x + this.size.x / 2 > otherBounds.position.x - otherBounds.size.x / 2
      && this.position.x - this.size.x / 2 < otherBounds.position.x + otherBounds.size.x / 2
      && this.position.y + this.size.y / 2 > otherBounds.position.y - otherBounds.size.y / 2
      && this.position.y - this.size.y / 2 < otherBounds.position.y + otherBounds.size.y / 2
  }
}
