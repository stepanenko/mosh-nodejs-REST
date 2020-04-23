
getCustomer(1, getCu);

function sending() {
  console.log('Email sent...');
}

function getTop(movies) {
  console.log('Top Movies:', movies);
  sendEmail(sending);
}

function getCu(customer) {
  console.log('Customer:', customer);
  if (customer.isGold) {
    getTopMovies(getTop);
  }
}

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: 'Sergio', email: 'sergio@email.com', isGold: true });
  }, 1000)
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['Avengers', 'Sherlock Holmes']);
  }, 1000);
}

function sendEmail(callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}
