const Congrats = require('../congrats')
const Payment = require('../Payment/Payment')

const Shipping = require('../Shipping/Shipping');

const createPayment = (payments) => {
  return payments.map(p => {
    return Payment().createType(p.payment_method_id)
  })
}
const createShipping = (shipping) => {
  return Shipping().createType(shipping.shipping_mode)
}

const protoOrder = {
  payments: [],
  shipping: {},
  getShipping() {
    return this.shipping
  },
  getPayment() {
    return this.payments[0]
  },
  congrat() {
    return this.getPayment()
      .visit(this.getShipping())
      .congrat()
  }
}

/**
 * @param data {Object} order from API
 * @return Order {Order}
 */
const createOrder = data => {
  
  const order = Object.create(protoOrder)
  
  order.payments = createPayment(data.payments)
  order.shipping = createShipping(data.shipping)
  return order
}

module.exports = createOrder