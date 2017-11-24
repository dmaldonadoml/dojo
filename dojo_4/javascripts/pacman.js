const createWeight = require('./weight');
const ProtoState = {
  visitPhanton(pacman, phanton) {
    pacman.setStateDead()
  }
}
const createState = (specs) => {
  const state = Object.create(ProtoState)
  return Object.assign(state, specs)
}
const AliveState = createState({
  id: 'alive'
})
const StrongerState = createState({
  id: 'stronger'
  ,visitPhanton(pacman, phanton) {
    phanton.kill()
  }
})
const DeadState = createState({
  id: 'dead'
})

module.exports = (weight_value) => {
    
  const weight = createWeight(weight_value)
    
  return {
    weight
    ,status: AliveState
    ,getWeight() {
      return weight.weight
    }
    ,visitPhanton(phanton) {
      this.status.visitPhanton(this, phanton)
    }
    ,getStatus() {
      return this.status.id
    }
    ,setStatus(status) {
      this.status = status
    },
    setStateStronger() {
      this.setStatus(StrongerState)
    },
    setStateDead() {
      this.setStatus(DeadState)
    },
    describe(fb) {
      fb(this)
    }
  }
}
