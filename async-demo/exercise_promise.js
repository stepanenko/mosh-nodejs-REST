
getCustomer(1)
  .then(customer => {
    if (customer.isGold) {
      getTopMovies(customer.email)
        .then(data => sendEmail(data.movies))
        .then(console.log);
    } else {
      console.log(customer);
    }
  });

  
function getCustomer(id) {
  const customer = new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: id, name: 'Sergio', email: 'sergio@email.com', isGold: true });
    }, 2000)
  });
  return customer;
}

function getTopMovies(email) {
  const movies = new Promise(resolve => {
    setTimeout(() => {
      resolve({ email: email, movies: ['Avengers', 'Sherlock Holmes'] });
    }, 2000);
  });
  return movies;
}

function sendEmail(movies) {
  const email = new Promise(resolve => {
    setTimeout(() => {
      resolve('Email sent...');
    }, 2000);
  });
  return email;
}
