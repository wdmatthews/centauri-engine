import RectangleBounds from './RectangleBounds.js'
import Shape from './Shape.js'
import Vector from './Vector.js'

export default class Circle extends Shape {
  /**
   * Creates a new circle with the given position, angle, scale, and radius.
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
   * @param {number} radius Default: 0.
   * @param {object} style { fillColor: string, outlineColor: string, outlineWidth: number }
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(position, angle, scale, radius, style, renderSettings) {
    super(position, angle, scale, style, renderSettings)
    this.radius = radius ?? 0
  }
  
  /**
   * Draws the circle.
   * @param {object} camera
   */
  draw(camera) {
    const { ctx, bounds: cameraBounds } = camera
    if (!cameraBounds.overlaps(new RectangleBounds(this.position,
      new Vector(this.radius * 2, this.radius * 2)))) { return }
    super.draw(camera, () => {
      ctx.beginPath()
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
      if (this.fillColor !== 'transparent') { ctx.fill() }
      if (this.outlineColor !== 'transparent') { ctx.stroke() }
    })
  }
}
