import Anchor from './Anchor.js'
import Circle from './Circle.js'
import Text from './Text.js'
import Vector from './Vector.js'

export default class LoadingScreen {
  /**
   * Creates a new loading screen.
   * @param {object} camera
   */
  constructor(camera) {
    const drawingToCanvasUnits = Math.min(camera.canvas.width, camera.canvas.height) / 512
    this.star = new Circle(new Vector(), 0, new Vector(1, 1), 192 / 2 * drawingToCanvasUnits, {
      fillColor: '#90CAF9',
    })
    this.orbit = new Circle(new Vector(), 0, new Vector(1, 1), 384 / 2 * drawingToCanvasUnits, {
      outlineColor: 'white',
      outlineWidth: 20 * drawingToCanvasUnits,
    })
    this.planet = new Circle(new Vector(384 / 2 * drawingToCanvasUnits, 0), 0,
      new Vector(1, 1), 96 / 2 * drawingToCanvasUnits, {
        fillColor: '#1DE9B6',
      })
    this.loadingText = new Text('Loading', new Vector(0, -4), 0, new Vector(1, 1), {
      font: 'bold 32px sans-serif',
      fillColor: 'white',
    })
    this.anchor = new Anchor()
  }
  
  /**
   * Draws the graphic.
   * @param {object} camera
   * @param {object} engine A reference to Centauri.
   */
  draw(camera, engine) {
    camera.ctx.clearRect(0, 0, camera.canvas.width, camera.canvas.height)
    const drawingToCanvasUnits = Math.min(camera.canvas.width, camera.canvas.height) / 512
    const radius = 384 / 2 * drawingToCanvasUnits
    this.planet.position.set(radius * Math.cos(engine.currentFrame / 100),
      radius * Math.sin(engine.currentFrame / 100))
    this.star.draw(camera, engine, this.anchor)
    this.orbit.draw(camera, engine, this.anchor)
    this.planet.draw(camera, engine, this.anchor)
    this.loadingText.draw(camera, engine, this.anchor)
  }
}
