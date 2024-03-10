const client = require('./components/client')

const {
  fetchProducts,
  createProduct
} = require('./components/products');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./components/auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./components/cart');

// users > not null = username, email_address
// products > not null = price, image_url, artist, format, genre, quality
// 'public/site_images/user_images/DefaultProfilePicture.jpeg'

const seed = async()=> {
  const SQL = `
  CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    email_address VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(16) UNIQUE NOT NULL,
    name VARCHAR(50),
    profile_photo VARCHAR(250) NOT NULL DEFAULT 'public/site_images/user_images/DefaultProfilePicture.jpeg',
    is_admin BOOLEAN DEFAULT false NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS products(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(9,2), 
    image_url VARCHAR(500),
    artist VARCHAR(25),
    format VARCHAR(30),
    release_date VARCHAR(35),
    genre VARCHAR(15),
    quality VARCHAR(15)
  );
  
  CREATE TABLE IF NOT EXISTS product_tracklisting(
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    track_number INTEGER,
    track_title VARCHAR(100),
    PRIMARY KEY (product_id, track_number)
  );
  
  CREATE TABLE IF NOT EXISTS orders(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    is_cart BOOLEAN NOT NULL DEFAULT true,
    user_id UUID REFERENCES users(id) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS line_items(
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    product_id UUID REFERENCES products(id) NOT NULL,
    order_id UUID REFERENCES orders(id) NOT NULL,
    quantity INTEGER DEFAULT 1,
    CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
  );
    

  `;
  await client.query(SQL);

    // Process for data seeding
  const checkIfUserExists = async (username) => {
    const SQL = 'SELECT COUNT(*) FROM users WHERE username = $1';
    const response = await client.query(SQL, [username]);
    return parseInt(response.rows[0].count) > 0;
  };
  
  const seed = async () => {
    const userExists = await checkIfUserExists('dkoob');

    if (!userExists) {
      const [dylan] = await Promise.all([
        createUser({
          username: 'dkoob',
          password: 'admin',
          is_admin: true,
          name: 'Dylan Kooby',
          email_address: 'dkooby1@gmail.com',
        }),
      ]);
      console.log('User seeded:', dylan);
    } else {
      console.log('User with username "dkoob" already exists. Skipping seeding.');
    }
  };

  seed();
  
  // const [foo, bar, bazz] = await Promise.all([
    //   createProduct({ name: 'foo' }),
    //   createProduct({ name: 'bar' }),
  //   createProduct({ name: 'bazz' }),
  //   createProduct({ name: 'quq' }),
  // ]);
  // let orders = await fetchOrders(dylan.id);
  // let cart = orders.find(order => order.is_cart);
  // let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  // lineItem.quantity++;
  // await updateLineItem(lineItem);
  // lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  // cart.is_cart = false;
  // await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  client,
  createUser
};
