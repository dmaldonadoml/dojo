const chai = require('chai');
const createPacman = require('../pacman');
const createBiscuit = require('../biscuit');
const createCherry = require('../cherry');
const createPhanton = require('../phanton');
const createPellet = require('../pellet');

const assert = chai.assert;

describe("pacman", () => {
    it("pacman is created with weight default to 1", () => {
      const pacman = createPacman()
      assert.equal(pacman.getWeight(), 1)
    });
    
    it("should get fat whether it eats biscuits 2", () => {
      const pacman = createPacman()
      const biscuit = createBiscuit()
      biscuit.acceptPacman(pacman)
      biscuit.acceptPacman(pacman)
      biscuit.acceptPacman(pacman)
      assert.equal(pacman.getWeight(), 4)
    });
    
    it("should duplicate fat whether it eats cherry", () => {
      const pacman = createPacman()
      const cherry = createCherry()
      cherry.acceptPacman(pacman)
      assert.equal(pacman.getWeight(), 2)
    });

    it('pacman should be created with status alive', () => {
      const pacman = createPacman()
      assert.equal(pacman.getStatus(), 'alive')
    });

    it("should die (status dead) whether bumps into phanton", () => {
      const pacman = createPacman()
      const phanton = createPhanton()
      phanton.acceptPacman(pacman)
      assert.equal(pacman.getStatus(), 'dead')
    });

    it("phantom should be created with base status", () => {
      const phanton = createPhanton()
      assert.equal(phanton.getStatus(), 'base')
    });

    it("pellet should change state of pacman to stronger", () => {
      const pellet = createPellet()
      const pacman = createPacman()
      pellet.acceptPacman(pacman)
      assert.equal(pacman.getStatus(), 'stronger')
    });

    it("pacman with status stronger should kill phanton", () => {
      const pellet = createPellet()
      const pacman = createPacman()
      const phanton = createPhanton()
      pellet.acceptPacman(pacman)
      phanton.acceptPacman(pacman)
      assert.equal(pacman.getStatus(), 'stronger')
      assert.equal(phanton.getStatus(), 'dead')
      //const biscuit = createBiscuit()
      //biscuit.acceptPacman(pacman)
      //assert.equal(pacman.getWeight(), 2)
    });
});
