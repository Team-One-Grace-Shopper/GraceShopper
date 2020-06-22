'use strict'

const db = require('../server/db')
const {User, Mask, Order, Cart} = require('../server/db/models')
// const {Mask} = require('sequelize/types')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [user1, user2, user3, user4, user5] = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Pug',
      googleId: 'codyPug'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Jane',
      lastName: 'Murphy',
      googleId: 'janeMurphy'
    }),
    User.create({
      email: 'bright_future@email.com',
      password: 'bright',
      firstName: 'Michelle',
      lastName: 'Jones',
      googleId: 'michelleJones'
    }),
    User.create({
      email: 'myspamemail@email.com',
      password: 'password',
      firstName: 'Name',
      lastName: 'Name',
      googleId: 'nameName'
    }),
    User.create({
      email: 'bobSmith@email.com',
      password: 'bobsmithpassword',
      firstName: 'Bob',
      lastName: 'Smith',
      googleId: 'bobSmith'
    })
  ])

  const [
    mask1,
    mask2,
    mask3,
    mask4,
    mask5,
    mask6,
    mask7,
    mask8,
    mask9,
    mask10,
    mask11,
    mask12,
    mask13,
    mask14,
    mask15,
    mask16,
    mask17,
    mask18,
    mask19,
    mask20
  ] = await Promise.all([
    Mask.create({
      name: 'Black Mask',
      imageUrl:
        'https://senpaiscloset.com/wp-content/uploads/2020/02/MaskBlack.jpg',
      description: 'Solid mask, Black',
      price: 999
    }),
    Mask.create({
      name: 'White Mask',
      imageUrl:
        'https://cdn11.bigcommerce.com/s-mobtsc45qz/images/stencil/1280x1280/products/1049/2259/Face_Mask-WHITE-ANGLE__56793.1586457472.jpg?c=2',
      description: 'Solid mask, White',
      price: 999
    }),
    Mask.create({
      name: 'Red Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1527/4077/products/Red_c1b17c30-284f-4763-906e-1b79517018c1.jpg?v=1589836724',
      description: 'Solid mask, Red',
      price: 999
    }),
    Mask.create({
      name: 'Orange Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0084/2412/products/orange_a504d86c-ce1a-4f97-bba5-acbadedc2de8_grande.png?v=1588548278',
      description: 'Solid mask, Orange',
      price: 999
    }),
    Mask.create({
      name: 'Yellow Mask',
      imageUrl: 'https://sc01.alicdn.com/kf/HTB1u40lXjnuK1RkSmFPq6AuzFXam.jpg',
      description: 'Solid mask, Yellow',
      price: 999
    }),
    Mask.create({
      name: 'Green Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2121/3325/products/olivegreenfacemaskwithfilterpockets_2048x.jpg?v=1589416330',
      description: 'Solid mask, Green',
      price: 999
    }),
    Mask.create({
      name: 'Blue Mask',
      imageUrl:
        'https://cdn11.bigcommerce.com/s-p1jdk/images/stencil/1280x1280/products/8497/190452/1005A-childrens-blue-face-mouth-mask-anti-haze-dust-washable-reusable-01__35701.1584863256.jpg?c=2&imbypass=on',
      description: 'Solid mask, Blue',
      price: 999
    }),
    Mask.create({
      name: 'Purple Mask',
      imageUrl:
        'https://static.bhphoto.com/images/images1000x1000/1587638766_1558602.jpg',
      description: 'Solid mask, Purple',
      price: 999
    }),
    Mask.create({
      name: 'Pink Mask',
      imageUrl: 'https://m.media-amazon.com/images/I/31CmQ+GQ8WL.jpg',
      description: 'Solid mask, Pink',
      price: 999
    }),
    Mask.create({
      name: 'Gray Mask',
      imageUrl:
        'https://cdn11.bigcommerce.com/s-p1jdk/images/stencil/1280x1280/products/8498/190489/1005A-childrens-grey-face-mouth-mask-anti-haze-dust-washable-reusable-01__67078.1584863560.jpg?c=2&imbypass=on',
      description: 'Solid mask, Gray',
      price: 999
    }),
    Mask.create({
      name: 'Navy Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0096/8736/7740/products/image_6dc5151b-3d8b-4bd1-bc28-a05d33ce2eb4_928x800.jpg?v=1588164494',
      description: 'Solid mask, Navy',
      price: 999
    }),
    Mask.create({
      name: 'Pikachu Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0272/1978/7829/products/mask-mockup_201a5862-65d4-4d1d-baa2-1b74603e381e_600x.jpg?v=1584378526',
      description: 'Patterned mask, Character, Pikachu, Yellow',
      price: 1499
    }),
    Mask.create({
      name: 'Galaxy Mask',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81a%2BsDbrWxL._AC_SL1500_.jpg',
      description: 'Patterned mask, Galaxy, Purple',
      price: 1499
    }),
    Mask.create({
      name: 'Floral Mask',
      imageUrl:
        'https://d1wwyfhxuarwk4.cloudfront.net/images/products/common/white/xl/5520-11-w_womens-protective-cloth-face-mask-blue-modern-floralcb74c3505876f1f28f1745a40766ca77.jpg',
      description: 'Patterned mask, Floral, Blue, Pink',
      price: 1499
    }),
    Mask.create({
      name: 'Joker Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0093/1407/4687/products/IMG_8691_800x.jpg?v=1589266434',
      description: 'Patterned mask, Character, Joker',
      price: 1499
    }),
    Mask.create({
      name: 'Checkered Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0292/0177/products/image_548f48f9-3669-496b-8e2b-00be381207c4_1024x1024.jpg?v=1588876272',
      description: 'Patterned mask, Checker, Black, White',
      price: 1499
    }),
    Mask.create({
      name: 'Ocean Mask',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1369/1641/products/MaskLB.124_600x.jpg?v=1590018417',
      description: 'Patterned mask, Ocean, Blue',
      price: 1499
    }),
    Mask.create({
      name: 'Stay Home Mask',
      imageUrl:
        'https://ih1.redbubble.net/image.1179758377.1261/ur,mask_flatlay_front,wide_portrait,750x1000.jpg',
      description: 'Slogan mask, Stay Home, Orange, Black',
      price: 1499
    }),
    Mask.create({
      name: 'Dinosaur Mask',
      imageUrl:
        'https://images.lookhuman.com/render/standard/JtzndugWQp7jlbslieKvl6fwA01HNpUi/maskcover-whi-z1-t-space-dinos.jpg',
      description:
        'Patterned mask, Dinosaur, Orange, Yellow, Green, Blue, Navy',
      price: 1499
    }),
    Mask.create({
      name: 'Too Close Mask',
      imageUrl:
        'https://i.etsystatic.com/21734891/r/il/4ad640/2249691714/il_570xN.2249691714_gf5v.jpg',
      description: 'Slogan mask, Too Close, Black, White',
      price: 1499
    })
  ])

  // const [order1, order2, order3] = await Promise.all([
  //   Order.create(),
  //   Order.create(),
  //   Order.create()
  // ])
  // *** Immediately generate order for each user
  const [order1, order2, order3, order4, order5] = await Promise.all([
    user1.createOrder(),
    user2.createOrder(),
    user3.createOrder(),
    user4.createOrder(),
    user5.createOrder()
  ])

  // *** ASSOCIATIONS
  // *** test Model associations in both directions
  await order1.addMask([mask11.id, mask8.id])
  await order2.addMask([mask16.id, mask4.id])
  await order3.addMask([mask5.id, mask15.id])
  await order4.addMask([mask1.id, mask2.id, mask19.id, mask20.id])
  await order5.addMask([mask12.id, mask7.id, mask3.id, mask17.id])

  // *** test adding price in Cart model
  // TODO: Need to find a way to combine this with the above Order.addMask method, or else we can't have "allowNull: false" property with Cart.price...
  const [NumOfAffectedRowsPrice, affectedRowsPrice] = await Cart.update(
    {price: mask11.price},
    {
      where: {
        orderId: order1.id,
        maskId: mask11.id
      },
      returning: true,
      plain: true
    }
  )
  if (affectedRowsPrice) {
    // *** NOTE: the value represented by {order1.userId} can be used to find the user connected to this mask (findByPk()?)
    // *** PATHWAY: mask->cart->order->user
    // TODO: is there a better way to reference the user? will we need too?
    console.log(`Here's ${order1.userId}'s Cart PRICE for ${mask11.name}:`)
    console.log(affectedRowsPrice.price)
  }

  // *** test ability to change QTY of cart item
  const [NumOfAffectedRows, affectedRows] = await Cart.update(
    {quantity: 12},
    {
      where: {
        orderId: order1.id,
        maskId: mask11.id
      },
      returning: true,
      plain: true
    }
  )
  if (affectedRows) {
    console.log(`Here's ${order1.userId}'s Cart QTY for ${mask11.name}:`)
    console.log(affectedRows.quantity)
  }

  // console.log(`seeded ${masks.length} masks`)
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
