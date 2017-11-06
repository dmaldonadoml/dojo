const createOrder = require('../Order/Order')

const efectyBuyEqualPay = require('./params/efectyBuyEqualPay')
const creditCardByEqualPayShippedByME = require('./params/creditCardByEqualPayShippedByME')
const creditCardBuyEqualPayWithCustomShipping = require('./params/creditCardBuyEqualPayWithCustomShipping')

const generateCongrat = order_data => () => {
  const order = createOrder(order_data)
  const result = order.congrat()
  expect(result).toMatchSnapshot()
}

const tests = [
  {
    description: 'should get rendered congrats for Efecty',
    test: generateCongrat(efectyBuyEqualPay)
  }
  ,{
    description: 'should render congrats for orders paid by credit cards shipped customly',
    test: generateCongrat(creditCardBuyEqualPayWithCustomShipping)
  }
  ,{
    description: 'by credit card ship ME',
    test: generateCongrat(creditCardByEqualPayShippedByME)
  }
]

describe('Congrats', () => {
  describe("B = P", function() {
    tests.forEach(({description,test}) => it(description,test))
  })
})
