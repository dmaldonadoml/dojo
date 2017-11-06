const congrat = function(Congrat) {
  const payment_type = this.data.payments.map(p => p.payment_type)
  const shipping_mode = this.data.shipping.shipping_mode
  
  // how you know about payment_type and shipping_mode 
  const method = `${payment_type[0]}_${shipping_mode}`
  
  if (Congrat[method] === undefined) {
    throw new Error(`${method} is not defined in Congrat`)
  }
  
  return Congrat[method](this.data)
}

const Order = {
  data: {},
  congrat
}

module.exports = data => Object.assign(Object.create(Order), { data })