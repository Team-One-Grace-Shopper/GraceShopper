/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Mask = db.model('mask')

describe('Mask model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let mask
  before(() => db.sync({force: true}))
  beforeEach(() => {
    mask = {
      name: 'Red Mask',
      imageUrl: '/images/redMask.jpg',
      description: 'A beautiful red mask',
      price: 11.0
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields name, imageUrl, description, price', async () => {
    mask.notARealAttribute = 'not a real attribute'
    const savedMask = await Mask.create(mask)
    expect(savedMask.name).to.equal('Red Mask')
    expect(savedMask.imageUrl).to.equal('/images/redMask.jpg')
    expect(savedMask.description).to.equal('A beautiful red mask')
    expect(savedMask.price).to.equal('11.00')
    expect(savedMask.notARealAttribute).to.equal(undefined)
  })

  it('name cannot be null', async () => {
    const blankMask = Mask.build()
    try {
      await blankMask.validate()
      throw Error('validation should have failed without name')
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
    }
  })
}) // end describe('Mask model')
