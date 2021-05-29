import RectangleBounds from './RectangleBounds.js'
import Shape from './Shape.js'
import Vector from './Vector.js'

export default class Video extends Shape {
  /**
   * Creates a new video with the given position, angle, scale, and size.
   * Accepted optional styling is:
   *  a fillColor string used with ctx.fillStyle (Default: 'transparent'),
   *  an outlineColor string used with ctx.strokeStyle (Default: 'transparent'),
   *  an outlineWidth string used with ctx.lineWidth (Default: 1).
   * Accepted optional render settings are:
   *  an isVisible boolean used for rendering the shape or not (Default: true),
   *  a sortingLayer number used for sorting shapes. A higher number will draw above a lower number (Default: 0),
   *  a cameraTargets string array containing the names of cameras to display on (Default: ['main']).
   * @param {string} videoAlias Default: ''.
   * @param {Vector} position Default: new Vector(0, 0).
   * @param {number} angle Angle in degrees. Default: 0.
   * @param {Vector} scale Default: new Vector(1, 1).
   * @param {object|Vector} size Default: The same as the source video. If given an x, the y will be calculated using the aspect ratio. If given a y, the x will be calculated using the aspect ratio.
   * @param {object} renderSettings { isVisible: boolean, sortingLayer: number, cameraTargets: string[] }
   */
  constructor(videoAlias, position, angle, scale, size, renderSettings) {
    super(position, angle, scale, {}, renderSettings)
    this.videoAlias = videoAlias ?? ''
    this.size = size ?? null
  }
  
  /**
   * Draws the video.
   * @param {object} camera
   * @param {object} engine A reference to Centauri.
   * @param {object} anchor
   */
  draw(camera, engine, anchor) {
    const { ctx, bounds: cameraBounds } = camera
    const video = engine.videos[this.videoAlias]
    
    if (!this.aspectRatio) {
      this.aspectRatio = video.videoWidth / video.videoHeight
    }
    
    if (!this.size || (!this.size.x && !this.size.y)) {
      this.size = new Vector(video.videoWidth, video.videoHeight)
    } else if (!this.size.x) {
      this.size = new Vector(this.size.y * this.aspectRatio, this.size.y)
    } else if (!this.size.y) {
      this.size = new Vector(this.size.x, this.size.x / this.aspectRatio)
    }
    
    const worldPosition = Vector.addVectors(this.position, anchor.parentPosition)
    const isOffCamera = !cameraBounds.overlaps(new RectangleBounds(worldPosition, this.size))
    if (isOffCamera) { return }
    
    super.draw(camera, () => {
      ctx.drawImage(video, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y)
    }, anchor)
  }
}
