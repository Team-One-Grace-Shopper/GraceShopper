const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Mask = db.model('mask')

describe('Mask routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/masks/', () => {
    // const blueMask = 'Blue Mask'

    beforeEach(() => {
      return Mask.create({
        name: 'Blue Mask',
        imageUrl: '/images/blueMask.jpg',
        description: 'An awesome blue mask',
        price: 999
      })
    })

    it('GET /api/masks', async () => {
      const res = await request(app)
        .get('/api/masks')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Blue Mask')
      expect(res.body[0].imageUrl).to.be.equal('/images/blueMask.jpg')
      expect(res.body[0].description).to.be.equal('An awesome blue mask')
      expect(res.body[0].price).to.be.equal(9.99)
    })
  }) // end describe('/api/masks')
}) // end describe('Mask routes')
