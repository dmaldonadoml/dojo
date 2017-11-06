const Congrats = require('../congrats')

const Custom = {
  id: 'custom',
  congrat() {
    return Congrats.approved()
  },
  visa(Visa) {
    return this
  },
  efecty(Efecty) {
    return Efecty
  }
}

const MeliEnvio = {
  id: 'me2',
  congrat() {
    return Congrats.approved()
  },
  visa(Visa) {
    return Visa
  },
  efecty(Efecty) {
    return Efecty
  }
}

const shippingsTypes = {
  'custom': Custom,
  'me2': MeliEnvio
}

const getType = key => shippingsTypes[key]

const Shipping = (type) => ({
  type,
  congrat() {
    return type.congrat()
  },
  accept(Payment) {
    return type[Payment.id](Payment)
  },
  createType(key) {
    return Shipping(getType(key))
  }
})

module.exports = Shipping