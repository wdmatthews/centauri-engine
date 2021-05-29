import { Anchor, Graphic, Vector, Renderable } from '../../js/Centauri.js'

export default class Projectile extends Renderable {
  static sortingLayer = 1
  
  /**
   * Creates a new spaceship.
   * @param {Vector} position
   * @param {number} angle
   * @param {Vector} scale
   * @param {string[]} cameraTargets
   */
  constructor(position, angle, scale, cameraTargets) {
    super(true, Projectile.sortingLayer, cameraTargets)
    this.position = position ?? new Vector()
    this.angle = angle ?? 0
    this.scale = scale ?? new Vector(1, 1)
    this.graphic = new Graphic('projectile')
    this.velocity = new Vector()
    this.speed = 10
    this.lifetime = 60 * 2
    this.lifetimer = 0
  }
  
  /**
   * Draws the spaceship.
   * @param {object} camera
   * @param {object} engine
   * @param {object} anchor
   */
  draw(camera, engine, anchor) {
    const graphicAnchor = new Anchor(
      this.position,
      new Vector(anchor.position.x + this.position.x,
        anchor.position.y - this.position.y), -this.angle + anchor.angle,
      new Vector(this.scale.x * anchor.scale.x, this.scale.y * anchor.scale.y),
    )
    
    this.graphic.draw(camera, engine, graphicAnchor)
  }
  
  /**
   * Initializes the projectile at a given point and angle.
   * @param {Vector} position
   * @param {number} angle
   */
  initialize(position, angle) {
    this.position = position
    this.angle = angle
    const velocityAngle = Math.PI / 180 * this.angle
    this.velocity.set(this.speed * Math.cos(velocityAngle), this.speed * Math.sin(velocityAngle))
    this.lifetimer = this.lifetime
    this.isVisible = true
  }
  
  /**
   * Moves and decays the projectile.
   */
  run() {
    this._move()
    this._decay()
  }
  
  _move() {
    this.position.add(this.velocity)
  }
  
  _decay() {
    if (this.lifetimer > 0) {
      this.lifetimer--
    } else {
      this.isVisible = false
    }
  }
}
