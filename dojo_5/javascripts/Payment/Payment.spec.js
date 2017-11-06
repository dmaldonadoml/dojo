const Payment = require('./Payment')
const Congrats = require('../congrats')

const efecty = 'efecty'
const visa = 'visa'

describe('Payment', () => {
  
  it('Interface', () => {
    const payment = Payment()
    expect(payment).toMatchSnapshot()
  })  
  describe('congrats', () => {
    
    it('Efecty', () => {
      const Efecty = Payment().createType(efecty)
      expect(Efecty.congrat()).toMatchSnapshot()
    })
    it('visa', () => {
      const Visa = Payment().createType(visa)
      expect(Visa.congrat()).toMatchSnapshot()
    })
  })  
})