import RectangleBounds from './RectangleBounds.js'
import Shape from './Shape.js'
import Vector from './Vector.js'

export default class Ellipse extends Shape {
  /**
   * Creates a new ellipse with the given position, angle, scale, and radius.
   * Accepted optional styling is:
   *  a fillColor string used with ctx.fillStyle (Default: 'transparent'),
   *  an outlineColor string used with ctx.strokeStyle (Default: 'transparent'),
   *  an outlineWidth string used with ctx.lineWidth (Default: 1).
   * Accepted optional render settings are:
   *  an isVisible boolean used for rendering the shape or not (Default: true),
   *  a sortingLayer number used for sorting shapes. A higher number will draw above a lower number (Default: 0),
   *  a cameraTargets string array containing the names of cameras to display on (Default: ['main']).
   * @param {Vector} position Default: new Vector(0, 0).
   * @param {number} angle Angle in degrees. Default: 0.
   * @param {Vector} scale Default: new Vector(1, 1).
   * @param {Vector} radius Default: new Vector(0, 0).
   * @param {object} style { fillColor: string, outlineColor: string, outlineWidth: number }
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(position, angle, scale, radius, style, renderSettings) {
    super(position, angle, scale, style, renderSettings)
    this.radius = radius ?? new Vector()
  }
  
  /**
   * Draws the ellipse.
   * @param {object} camera
   * @param {object} engine A reference to Centauri.
   * @param {object} anchor
   */
  draw(camera, engine, anchor) {
    const { ctx, bounds: cameraBounds } = camera
    const worldPosition = Vector.addVectors(this.position, anchor.parentPosition)
    const isOffCamera = !cameraBounds.overlaps(new RectangleBounds(worldPosition,
      new Vector(this.radius.x * 2, this.radius.y * 2)))
    if (isOffCamera) { return }
    
    super.draw(camera, () => {
      ctx.beginPath()
      ctx.ellipse(0, 0, this.radius.x, this.radius.y, 0, 0, 2 * Math.PI)
      if (this.fillColor !== 'transparent') { ctx.fill() }
      if (this.outlineColor !== 'transparent') { ctx.stroke() }
    }, anchor)
  }
}
