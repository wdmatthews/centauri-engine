import RectangleBounds from './RectangleBounds.js'
import Vector from './Vector.js'

export default class Camera {
  /**
   * Creates a camera with the given canvas ID or HTMLCanvasElement.
   * If given a string ID, the canvas will be retrieved with document.getElementById(`canvas`).
   * If given an HTMLCanvasElement, the canvas will be the given `canvas`.
   * @param {string|HTMLCanvasElement} canvas
   */
  constructor(name, canvas, renderables) {
    if (typeof canvas === 'string') {
      this.canvas = document.getElementById(canvas)
      this.ctx = this.canvas.getContext('2d')
    } else if (typeof canvas === 'object' && canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas
      this.ctx = this.canvas.getContext('2d')
    } else {
      console.error('Centauri Error: Camera could not be initialized. No valid canvas was given.')
      return
    }
    
    this.name = name
    this.position = new Vector()
    this.angle = 0
    this.scale = new Vector(1, 1)
    this.bounds = new RectangleBounds(this.position, new Vector(this.canvas.width, this.canvas.height))
    this.renderables = renderables
    this.canvas.oncontextmenu = e => e.preventDefault()
  }
  
  /**
   * Renders the camera's renderables.
   * @param {object} engine A reference to Centauri.
   */
  render(engine) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.renderables?.forEach(renderable => renderable.draw(this, engine))
  }
}
