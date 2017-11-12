const happyPath = {
  method: 'GET',
  url: '/friends/search?userName=gabrielJesus&searchField=ney'
}

const userNonexistent = {
  method: 'GET',
  url: '/friends/search?userName=userNonexistent&searchField=ma'
}

module.exports = {
  happyPath,
  userNonexistent
}