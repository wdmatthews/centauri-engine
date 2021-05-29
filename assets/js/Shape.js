import Renderable from './Renderable.js'
import Vector from './Vector.js'

export default class Shape extends Renderable {
  /**
   * Creates a new shape with the given position, angle, and scale.
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
   * @param {object} style { fillColor: string, outlineColor: string, outlineWidth: number }
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(position, angle, scale, style, renderSettings) {
    super(renderSettings?.isVisible, renderSettings?.sortingLayer, renderSettings?.cameraTargets)
    this.position = position ? new Vector(position.x, position.y) : new Vector()
    this.angle = angle ?? 0
    this.scale = scale ? new Vector(scale.x, scale.y) : new Vector(1, 1)
    this.fillColor = style?.fillColor ?? 'transparent'
    this.outlineColor = style?.outlineColor ?? 'transparent'
    this.outlineWidth = style?.outlineWidth ?? 1
  }
  
  /**
   * Draws the shape with the given method.
   * @param {object} camera
   * @param {function} drawMethod
   */
  draw(camera, drawMethod) {
    const { ctx, position: cameraPosition, canvas, angle: cameraAngle, scale: cameraScale } = camera
    ctx.save()
    ctx.translate(canvas.width / 2 + this.position.x - cameraPosition.x,
      canvas.height / 2 - this.position.y + cameraPosition.y)
    ctx.rotate(Math.PI / 180 * (this.angle + cameraAngle))
    ctx.scale(this.scale.x * cameraScale.x, this.scale.y * cameraScale.y)
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor
    ctx.lineWidth = this.outlineWidth
    if (drawMethod) { drawMethod() }
    ctx.restore()
  }
}
