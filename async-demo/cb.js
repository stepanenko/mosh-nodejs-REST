
function work(subj, callback) {
  console.log(`Started studying ${subj}...`);
  callback();
}

function done() {
  console.log('Done');
}

work('Math', done);
