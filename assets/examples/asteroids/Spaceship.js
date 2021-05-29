import { Anchor, Graphic, Vector, Renderable, Input } from '../../js/Centauri.js'
import Projectile from './Projectile.js'
import SpaceshipControls from './SpaceshipControls.js'

export default class Spaceship extends Renderable {
  static sortingLayer = 2
  
  /**
   * Creates a new spaceship.
   * @param {Vector} position
   * @param {number} angle
   * @param {Vector} scale
   * @param {SpaceshipControls} controls
   * @param {string[]} cameraTargets
   */
  constructor(position, angle, scale, controls, cameraTargets) {
    super(true, Spaceship.sortingLayer, cameraTargets)
    this.position = position ?? new Vector()
    this.angle = angle ?? 0
    this.scale = scale ?? new Vector(1, 1)
    this.controls = controls ?? new SpaceshipControls()
    this.graphic = new Graphic('spaceship')
    this.velocity = new Vector()
    this.forwardSpeed = 3
    this.turnSpeed = 3
    this.fireCooldown = 10
    this.fireCooldownTimer = 0
    this.activeProjectiles = []
    this.inactiveProjectiles = []
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
        anchor.position.y - this.position.y), -this.angle + 90 + anchor.angle,
      new Vector(this.scale.x * anchor.scale.x, this.scale.y * anchor.scale.y),
    )
    
    this.activeProjectiles.forEach(projectile => projectile.draw(camera, engine, anchor))
    this.graphic.draw(camera, engine, graphicAnchor)
  }
  
  /**
   * Moves, turns, and shoots based on user input.
   */
  handleInput() {
    this._turn()
    this._move()
    this._fire()
  }
  
  _turn() {
    let turnInput = 0
    if (Input.keyboard.isPressed[this.controls.left]) { turnInput++ }
    if (Input.keyboard.isPressed[this.controls.right]) { turnInput-- }
    this.angle += turnInput * this.turnSpeed
  }
  
  _move() {
    const forwardSpeed = Input.keyboard.isPressed[this.controls.forward] ? this.forwardSpeed : 0
    const angle = Math.PI / 180 * this.angle
    this.velocity.set(forwardSpeed * Math.cos(angle), forwardSpeed * Math.sin(angle))
    this.position.add(this.velocity)
  }
  
  _fire() {
    if (this.fireCooldownTimer > 0) {
      this.fireCooldownTimer--
    } else if (Input.keyboard.isPressed[this.controls.fire]) {
      this.fireCooldownTimer = this.fireCooldown
      this._spawnProjectile()
    }
  }
  
  _spawnProjectile() {
    let projectile = null
    
    if (this.inactiveProjectiles.length > 0) {
      projectile = this.inactiveProjectiles.pop()
    } else {
      projectile = new Projectile()
      projectile.filterRenderables = this.filterRenderables
    }
    
    projectile.initialize(new Vector(this.position.x, this.position.y), this.angle)
    this.activeProjectiles.push(projectile)
  }
  
  /**
   * Moves and decays this spaceship's projectiles.
   */
  runProjectiles() {
    for (let i = this.activeProjectiles.length - 1; i >= 0; i--) {
      const projectile = this.activeProjectiles[i]
      projectile.run()
      
      if (!projectile.isVisible) {
        this.activeProjectiles.splice(i, 1)
        this.inactiveProjectiles.push(projectile)
      }
    }
  }
}
