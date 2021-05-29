import RectangleBounds from './RectangleBounds.js'
import Shape from './Shape.js'
import Vector from './Vector.js'

export default class Path extends Shape {
  /**
   * Creates a new path with the given position, angle, scale, and points.
   * The points are relative to the path's position.
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
   * @param {Vector[]} points Default: [].
   * @param {object} style { fillColor: string, outlineColor: string, outlineWidth: number }
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(position, angle, scale, points, style, renderSettings) {
    super(position, angle, scale, style, renderSettings)
    this.points = points ?? []
  }
  
  /**
   * Draws the ellipse.
   * @param {object} camera
   */
  draw(camera) {
    const { ctx, bounds: cameraBounds } = camera
    
    let minX = 0
    let maxX = 0
    let minY = 0
    let maxY = 0
    
    this.points.forEach((point, index) => {
      if (index === 0) {
        minX = point.x
        maxX = point.x
        minY = point.y
        maxY = point.y
      } else {
        if (point.x < minX) { minX = point.x }
        if (point.x > maxX) { maxX = point.x }
        if (point.y < minY) { minY = point.y }
        if (point.y > maxY) { maxY = point.y }
      }
    })
    
    if (!cameraBounds.overlaps(new RectangleBounds(this.position,
      new Vector(maxX - minX, maxY - minY)))) { return }
    super.draw(camera, () => {
      ctx.beginPath()
      ctx.moveTo(this.points[0].x, -this.points[0].y)
      
      this.points.forEach((point, index) => {
        if (index > 0) { ctx.lineTo(point.x, -point.y) }
      })
      
      ctx.closePath()
      if (this.fillColor !== 'transparent') { ctx.fill() }
      if (this.outlineColor !== 'transparent') { ctx.stroke() }
    })
  }
}
