const success = ({heading,title}) => ({
    status: 'success',
    substatus: null,
    heading,
    title,
})

const rush = () => success({
  heading: '¡Apúrate a pagar!',
  title: 'Paga ${price} en ${paymentMethodName} para reservar tu compra'
})

const approved = () => success({
  heading: '¡Tu pago está aprobado!',
  title: 'Coordina con el vendedor el envío',
})

const excellent = () => success({
  heading: '¡Excelente compra!',
  title: 'El jueves 2017-05-18T00:00:00.000-05:00. te llegará el producto',
})

module.exports = {
  rush
  ,approved
  ,excellent
}