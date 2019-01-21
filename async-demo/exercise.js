
getCustomer(1, (customer) => {
  console.log('Customer:', customer);
  // if (customer.isGold) {
  //   getTopMovies((movies) => {
  //     console.log('Top Movies:', movies);
  //     sendEmail(customer.email, movies, () => {
  //       console.log('Email sent...');
  //     });
  //   });
  // }
});

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: 'Sergio', email: 'sergio@email.com'});
  }, 2000)
}