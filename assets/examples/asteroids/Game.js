import { Centauri, Camera } from '../../js/Centauri.js'

export default class Game {
  static async start(mainCanvas, uiCanvas) {
    await Centauri.initialize([
      new Camera('main', mainCanvas),
      new Camera('ui', uiCanvas),
    ], [], [], [])
  }
}
