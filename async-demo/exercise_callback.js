
getCustomer(1, (customer) => {
  console.log('Customer:', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top Movies:', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...');
      });
    });
  }
});

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: 'Sergio', email: 'sergio@email.com', isGold: true });
  }, 2000)
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['Avengers', 'Sherlock Holmes']);
  }, 2000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}
