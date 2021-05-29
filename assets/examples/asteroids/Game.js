import { Centauri, Camera, Vector, Script } from '../../js/Centauri.js'
import Spaceship from './Spaceship.js'
import SpaceshipControls from './SpaceshipControls.js'

export default class Game {
  static async start(mainCanvas1, mainCanvas2, uiCanvas1, uiCanvas2) {
    await Centauri.initialize([
      new Camera('main1', mainCanvas1),
      new Camera('main2', mainCanvas2),
      new Camera('ui1', uiCanvas1),
      new Camera('ui2', uiCanvas2),
    ], [
      { src: '/asteroids/ship_A.png', alias: 'spaceship' },
      { src: '/asteroids/star_tiny.png', alias: 'projectile' },
    ], [], [])
    
    const spaceship1 = new Spaceship(new Vector(-96, 0), 90, new Vector(1, 1),
      new SpaceshipControls(), ['main1', 'main2'])
    const spaceship2 = new Spaceship(new Vector(96, 0), 90, new Vector(1, 1),
      new SpaceshipControls('ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'), ['main2', 'main1'])
    
    Centauri.addRenderable(spaceship1)
    Centauri.addRenderable(spaceship2)
    
    Centauri.addScript(new Script((script, engine) => {
      engine.cameras[0].position.set(spaceship1.position.x, spaceship1.position.y)
      engine.cameras[1].position.set(spaceship2.position.x, spaceship2.position.y)
    }), true)
    
    Centauri.addScript(new Script(() => spaceship1.handleInput()), true)
    Centauri.addScript(new Script(() => spaceship2.handleInput()), true)
    
    Centauri.addScript(new Script(() => spaceship1.runProjectiles()), true)
    Centauri.addScript(new Script(() => spaceship2.runProjectiles()), true)
  }
}
