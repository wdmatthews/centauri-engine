import Vector from './Vector.js'

export default class Input {
  /**
   * Stores information about the mouse.
   * `wasPressed` contains mouse buttons that were pressed in the current frame.
   * `isPressed` contains mouse buttons that are currently being pressed.
   * `wasReleased` contains mouse buttons that were released in the current frame.
   * Supported button values are: 'left', 'middle', 'right', 'back', 'forward'
   */
  static mouse = {
    wasPressed: {},
    isPressed: {},
    wasReleased: {},
    _mouseButtons: ['left', 'middle', 'right', 'back', 'forward'],
    position: new Vector(),
    delta: new Vector(),
  }
  
  /**
   * Stores information about the keyboard.
   * `wasPressed` contains keys that were pressed in the current frame.
   * `isPressed` contains keys that are currently being pressed.
   * `wasReleased` contains keys that were released in the current frame.
   * Supported key values can be found at https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
   */
  static keyboard = {
    wasPressed: {},
    isPressed: {},
    wasReleased: {},
  }
  
  static _mainCanvas = null
  
  /**
   * Adds input event listeners to the given canvas.
   * @param {HTMLCanvasElement} mainCanvas
   */
  static initialize(mainCanvas) {
    Input._mainCanvas = mainCanvas
    addEventListener('keydown', Input._onKeyPress)
    addEventListener('keyup', Input._onKeyRelease)
    addEventListener('mousedown', Input._onMousePress)
    addEventListener('mouseup', Input._onMouseRelease)
    addEventListener('mousemove', Input._onMouseMove)
  }
  
  static onPostRender() {
    Input.mouse.wasPressed = {}
    Input.mouse.wasReleased = {}
    Input.keyboard.wasPressed = {}
    Input.keyboard.wasReleased = {}
  }
  
  /**
   * @param {KeyboardEvent} event
   */
  static _onKeyPress(event) {
    const { key } = event
    
    if (!Input.keyboard.isPressed[key]) {
      Input.keyboard.wasPressed[key] = true
    }
    
    Input.keyboard.isPressed[key] = true
  }
  
  /**
   * @param {KeyboardEvent} event
   */
  static _onKeyRelease(event) {
    const { key } = event
    
    if (Input.keyboard.isPressed[key]) {
      delete Input.keyboard.isPressed[key]
    }
    
    Input.keyboard.wasReleased[key] = true
  }
  
  /**
   * @param {MouseEvent} event
   */
  static _onMousePress(event) {
    const { button } = event
    const buttonName = Input.mouse._mouseButtons[button]
    
    if (!Input.mouse.isPressed[buttonName]) {
      Input.mouse.wasPressed[buttonName] = true
    }
    
    Input.mouse.isPressed[buttonName] = true
  }
  
  /**
   * @param {MouseEvent} event
   */
  static _onMouseRelease(event) {
    const { button } = event
    const buttonName = Input.mouse._mouseButtons[button]
    
    if (Input.mouse.isPressed[buttonName]) {
      delete Input.mouse.isPressed[buttonName]
    }
    
    Input.mouse.wasReleased[buttonName] = true
  }
  
  /**
   * @param {MouseEvent} event
   */
  static _onMouseMove(event) {
    const { x: mouseX, y: mouseY, movementX, movementY } = event
    const { x: canvasX, y: canvasY, width: canvasWidth, height: canvasHeight } = Input._mainCanvas.getBoundingClientRect()
    
    Input.mouse.position.set(mouseX - canvasX - canvasWidth / 2, canvasY - mouseY + canvasHeight / 2)
    Input.mouse.delta.set(movementX, -movementY)
  }
}
