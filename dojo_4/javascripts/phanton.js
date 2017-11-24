module.exports = () => {
  
  return {
    status: 'base'
    ,acceptPacman(pacman) {
      pacman.visitPhanton(this)
    }
    ,getStatus() {
      return this.status
    }
    ,setStatus(status) {
      this.status = status
    }
    ,kill() {
      this.setStatus('dead')
    }
  }
}