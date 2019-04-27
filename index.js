const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const ageMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age || age <= 0) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', ageMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('age', { message: 'major', age: age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('age', { message: 'minor', age: age })
})

app.listen(3000)
