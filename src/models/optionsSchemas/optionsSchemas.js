const versionKeyDisable = {
  versionKey: false
}
const _idAndVersionKeyDisable = {
  versionKey: false,
  _id: false
}

const optionsProfileSchema = {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt'
  }
}

module.exports = {
  versionKeyDisable,
  _idAndVersionKeyDisable,
  optionsProfileSchema
}