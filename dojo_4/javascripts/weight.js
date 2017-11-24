module.exports = (weight = 1) => {
  
  return {
    weight,
    add(value) {
      this.weight += value
    },
    duplicate() {
      this.weight = this.weight * 2
    }
  }
}