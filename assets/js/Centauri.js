import Anchor from './Anchor.js'
import Camera from './Camera.js'
import Circle from './Circle.js'
import Ellipse from './Ellipse.js'
import Graphic from './Graphic.js'
import Input from './Input.js'
import LoadingScreen from './LoadingScreen.js'
import Path from './Path.js'
import Rectangle from './Rectangle.js'
import RectangleBounds from './RectangleBounds.js'
import Renderable from './Renderable.js'
import Script from './Script.js'
import Shape from './Shape.js'
import Square from './Square.js'
import Text from './Text.js'
import Vector from './Vector.js'
import Video from './Video.js'

export class Centauri {
  static _isInitialized = false
  
  /**
   * Stores all of the cameras used by the engine.
   */
  static cameras = []
  
  /**
   * The main camera used by the engine.
   */
  static mainCamera = null
  
  /**
   * Stores all of the renderables to be drawn.
   */
  static renderables = []
  static _visibleRenderables = []
  
  /**
   * Stores all of the pre-render scripts to run.
   */
  static preRenderScripts = []
  static _enabledPreRenderScripts = []
  
  /**
   * Stores all of the post-render scripts to run.
   */
  static postRenderScripts = []
  static _enabledPostRenderScripts = []
  
  /**
   * Stores all of the images by name for later use.
   */
  static images = {}
  
  /**
   * Stores all of the audio files by name for later use.
   */
  static audio = {}
  
  /**
   * Stores all of the videos by name for later use.
   */
  static videos = {}
  
  static _loadingScreen = null
  
  /**
   * Initializes the Centauri Engine with the given cameras.
   * The first camera should be named 'main' and used as the main camera.
   * @param {Camera[]} cameras
   * @param {object[]} images A list of image srcs to load. { src: string, alias: string } Accessed by Centauri.images[alias].
   * @param {object[]} audio A list of audio srcs to load. { src: string, alias: string } Accessed by Centauri.images[alias].
   * @param {object[]} videos A list of video srcs to load. { src: string, alias: string } Accessed by Centauri.images[alias].
   * @param {function} onLoad A function to run after the engine is done loading. There is one parameter: a reference to the engine.
   */
  static async initialize(cameras, images = [], audio = [], videos = [], onLoad = null) {
    if (Centauri._isInitialized) {
      console.error('Centauri Error: Centauri Engine was already initialized.')
      return
    }
    
    if (cameras.length === 0) {
      console.error('Centauri Error: No cameras given when initializing Centauri Engine.')
      return
    }
    
    Centauri._isInitialized = true
    Centauri.currentFrame = 0
    Centauri.cameras = cameras
    Centauri.mainCamera = cameras[0]
    Input.initialize(Centauri.mainCamera.canvas)
    Centauri._isLoading = true
    Centauri._loadingScreen = new LoadingScreen(Centauri.mainCamera)
    requestAnimationFrame(Centauri._drawLoadingScreen)
    
    for (const file of images) {
      await new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve()
        image.onerror = reject
        image.src = file.src
        Centauri.images[file.alias] = image
      })
    }
    
    for (const file of audio) {
      Centauri.audio[file.alias] = new Audio(file.src)
    }
    
    for (const file of videos) {
      const video = document.createElement('video')
      video.src = file.src
      video.load()
      Centauri.videos[file.alias] = video
    }
    
    Centauri._isLoading = false
    if (onLoad) { onLoad(Centauri) }
    requestAnimationFrame(Centauri._run)
  }
  
  static _drawLoadingScreen() {
    Centauri._loadingScreen.draw(Centauri.mainCamera, Centauri)
    Centauri.currentFrame++
    if (Centauri._isLoading) { requestAnimationFrame(Centauri._drawLoadingScreen) }
  }
  
  static _run() {
    if (document.fullscreenEnabled && Input.keyboard.wasPressed.Escape) {
      document.exitFullscreen()
    }
    
    Centauri._enabledPreRenderScripts.forEach(script => script.run(script, Centauri))
    Centauri.cameras.forEach(camera => camera.render(Centauri))
    Centauri._enabledPostRenderScripts.forEach(script => script.run(script, Centauri))
    Input.onPostRender()
    
    Centauri.currentFrame++
    requestAnimationFrame(Centauri._run)
  }
  
  /**
   * Adds a renderable to Centauri and updates which renderables are rendered on which camera in which order.
   * @param {Renderable} renderable
   */
  static addRenderable(renderable) {
    Centauri.renderables.push(renderable)
    renderable.filterRenderables = Centauri.filterRenderables
    renderable.orderRenderables = Centauri.orderRenderables
    Centauri.filterRenderables()
    Centauri.orderRenderables()
  }
  
  /**
   * Removes a renderable from Centauri and updates which renderables are rendered on which camera in which order.
   * If `renderable` is a number, it will be used as an index.
   * If `renderable` is a Renderable, it will be used to find an index.
   * @param {number|Renderable} renderable
   */
  static removeRenderable(renderable) {
    let renderableIndex = -1
    
    if (typeof renderable === 'number' && Number.isInteger(renderable)
      && renderable >= 0 && renderable < Centauri.renderables.length) {
      renderableIndex = renderable
    } else if (typeof renderable === 'object' && renderable instanceof Renderable) {
      renderableIndex = Centauri.renderables.indexOf(renderable)
    }
    
    if (renderableIndex < 0) { return }
    Centauri.renderables.splice(renderableIndex, 1)
    Centauri.filterRenderables()
    Centauri.orderRenderables()
  }
  
  /**
   * Filters out invisible renderables.
   * Filters out renderables per camera that do not list that camera as a target.
   */
  static filterRenderables() {
    Centauri._visibleRenderables = Centauri.renderables.filter(renderable => renderable.isVisible)
    Centauri.cameras.forEach((camera) => {
      camera.renderables = Centauri._visibleRenderables.filter(renderable => renderable.cameraTargets.includes(camera.name))
    })
  }
  
  /**
   * Sorts the renderables for each camera in order of sorting layer.
   */
  static orderRenderables() {
    Centauri.cameras.forEach(camera => camera.renderables.sort((a, b) => a.sortingLayer - b.sortingLayer))
  }
  
  /**
   * Adds a script to Centauri.
   * @param {Script} script
   * @param {boolean} isPreRender Determines if preRenderScripts or postRenderScripts will be filtered.
   */
  static addScript(script, isPreRender) {
    const scripts = isPreRender ? Centauri.preRenderScripts : Centauri.postRenderScripts
    const enabledScripts = isPreRender ? Centauri._enabledPreRenderScripts : Centauri._enabledPostRenderScripts
    
    scripts.push(script)
    if (script.isEnabled) { enabledScripts.push(script) }
    
    script.isPreRender = isPreRender
    script.filterScripts = Centauri.filterScripts
  }
  
  /**
   * Removes a script from Centauri.
   * If `script` is a number, it will be used as an index. `isPreRender` will be used to determine if a pre-render script needs to be removed.
   * If `script` is a Script, it will be used to find an index.
   * @param {number|Script} script
   * @param {boolean} isPreRender Required if `script` is a number.
   */
  static removeScript(script, isPreRender) {
    let scriptIndex = -1
    const scripts = ((typeof script === 'number' && isPreRender)
      || (typeof script === 'object' && script.isPreRender))
      ? Centauri.preRenderScripts
      : Centauri.postRenderScripts
    
    if (typeof script === 'number' && Number.isInteger(script)
      && script >= 0 && script < scripts.length) {
      scriptIndex = script
    } else if (typeof script === 'object' && script instanceof Script) {
      scriptIndex = scripts.indexOf(script)
    }
    
    if (scriptIndex < 0) { return }
    scripts.splice(scriptIndex, 1)
  }
  
  /**
   * Filters out disabled scripts.
   * @param {boolean} isPreRender Determines if preRenderScripts or postRenderScripts will be filtered.
   */
  static filterScripts(isPreRender) {
    if (isPreRender) {
      Centauri._enabledPreRenderScripts = Centauri.preRenderScripts.filter(script => script.isEnabled)
    } else {
      Centauri._enabledPostRenderScripts = Centauri.postRenderScripts.filter(script => script.isEnabled)
    }
  }
}

export {
  Anchor,
  Camera,
  Circle,
  Ellipse,
  Graphic,
  Input,
  Path,
  Rectangle,
  RectangleBounds,
  Renderable,
  Script,
  Shape,
  Square,
  Text,
  Vector,
  Video,
}
