
async function getCust(id) {
  const customer = await getCustomer(id);
  console.log('Customer:', customer);
  if (customer.isGold) {
    const movies = await getTopMovies(customer.email);
    console.log('Movies:', movies);
    const send = await sendEmail(movies);
    console.log(send);
  } else {
    console.log('Customer:', customer);
  }
}

getCust(1);

function getCustomer(id) {
  const customer = new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: id, name: 'Sergio', email: 'sergio@email.com', isGold: true });
    }, 500)
  });
  return customer;
}

function getTopMovies(email) {
  const movies = new Promise(resolve => {
    setTimeout(() => {
      resolve({ email: email, movies: ['Avengers', 'Sherlock Holmes'] });
    }, 500);
  });
  return movies;
}

function sendEmail(movies) {
  const email = new Promise(resolve => {
    setTimeout(() => {
      resolve('Email sent...');
    }, 1000);
  });
  return email;
}
