/**
 * Práctica 1
 * Facultad de youtube
 *
 * @author Luis Olivares <luisolivaresesimez@gmail.com>
 *
 * Objetivo: crear una calculadora básica usando express y el servidor
 */
const express = require('express')

const app = express()

app.get('/', (_, res) => res.send('Hello, world'))
app.post('/', (_, res) => res.send('Hello, <b>post</b>'))

app
  .route('/book')
  .get((_, res) => res.send('a book received'))
  .post((_, res) => res.send('a book has been sent'))
  .put((_, res) => res.send('a book has been modified'))

function calc(op, a, b) {
  switch (op) {
    case 'add':
      return a + b
    case 'sub':
      return a - b
    case 'mul':
      return a * b
    case 'div':
      return a / b
    case 'exp':
      return a ** b
  }
}

app.get('/calc/:op/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a)
  const b = parseFloat(req.params.b)
  const { op } = req.params

  res.json({ op, a, b, result: calc(op, a, b) })
})

app.listen(3000, () => console.log('server ready on port 3000'))

/**
 * @conclusions
 *
 * res.send(string) puede entregar html válido
 * método route ahorra definir varias veces un endpoint
 */
