'use Strict';

module.exports = () => {
  const makeObject = (queryResult) => queryResult.toObject()

  return { makeObject }
}