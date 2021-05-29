// import RectangleBounds from './RectangleBounds.js'
import Shape from './Shape.js'
// import Vector from './Vector.js'

export default class Text extends Shape {
  /**
   * Creates a new text with the given position, angle, scale, and radius.
   * Accepted optional styling is:
   *  a font string used for ctx.font,
   *  a textAlign string used for ctx.textAlign,
   *  a textBaseline string used for ctx.textBaseline,
   *  a fillColor string used with ctx.fillStyle (Default: 'transparent'),
   *  an outlineColor string used with ctx.strokeStyle (Default: 'transparent'),
   *  an outlineWidth string used with ctx.lineWidth (Default: 1).
   * Accepted optional render settings are:
   *  an isVisible boolean used for rendering the shape or not (Default: true),
   *  a sortingLayer number used for sorting shapes. A higher number will draw above a lower number (Default: 0),
   *  a cameraTargets string array containing the names of cameras to display on (Default: ['main']).
   * @param {string} content Default: ''.
   * @param {Vector} position Default: new Vector(0, 0).
   * @param {number} angle Angle in degrees. Default: 0.
   * @param {Vector} scale Default: new Vector(1, 1).
   * @param {object} style { font: string, textAlign: string, textBaseline: string, fillColor: string, outlineColor: string, outlineWidth: number }
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(content, position, angle, scale, style, renderSettings) {
    super(position, angle, scale, style, renderSettings)
    this.content = content ?? ''
    this.font = style?.font ?? '16px sans-serif'
    this.textAlign = style?.textAlign ?? 'center'
    this.textBaseline = style?.textBaseline ?? 'middle'
  }
  
  /**
   * Draws the text.
   * @param {object} camera
   * @param {object} engine A reference to Centauri.
   * @param {object} anchor
   */
  draw(camera, engine, anchor) {
    const { ctx } = camera
    super.draw(camera, () => {
      ctx.font = this.font
      ctx.textAlign = this.textAlign
      ctx.textBaseline = this.textBaseline
      if (this.fillColor !== 'transparent') { ctx.fillText(this.content, 0, 0) }
      if (this.outlineColor !== 'transparent') { ctx.strokeText(this.content, 0, 0) }
    }, anchor)
  }
}
