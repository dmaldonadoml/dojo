const Congrats = require('../congrats')

const Efecty = {
  id: 'efecty',
  congrat() {
    return Congrats.rush()
  },
  visit(Shipping) {
    return Shipping.accept(this)
  }
}
const Visa = {
  id: 'visa',
  congrat() {
    return Congrats.excellent()
  },
  visit(Shipping) {
    return Shipping.accept(this)
  }
}

const types = {
  'visa': Visa,
  'efecty': Efecty
}

const getType = key => types[key]

const Payment = (type) => {
  
  return {
    type
    ,congrat() {
      return type.congrat()
    }
    ,visit(Shipping) {
      return type.visit(Shipping)
    }
    ,createType(key) {
      return Payment(getType(key))
    }
  }
}

module.exports = Payment