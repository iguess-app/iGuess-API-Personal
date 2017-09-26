const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const Profile = app.src.models.profileModel
const userErrors = app.coincidents.Utils.errorUtils.userErrors
const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

const profileSchemas = JSON.parse(fs.readFileSync('test/modelTests/SchemaFiles/profileSchemasFile.json'))

lab.experiment('ProfileSchema Validator', () => {

  lab.test('ProfileSchema HappyPath', (done) => {
    const correctSchema = new Profile(profileSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('ProfileSchema Description, UserName TooLoong and too many number of team appreciated', (done) => {
    const textsTooLoongSchema = new Profile(profileSchemas.textsTooLoong)
    textsTooLoongSchema.validate((err) => {
      expect(err.errors.name.message).to.equal(String(userErrors.nameSizeExplode))
      expect(err.errors.description.message).to.equal(String(userErrors.descriptionSizeExplode))
      expect(err.errors.userName.message).to.equal(String(userErrors.userNameSizeExplode))
      expect(err.errors['footballSupportedTeams.appreciatedTeams'].message).to.equal(String(userErrors.numberOfAppreciatedTeamsExplode))
      done()
    })
  })

  lab.test('ProfileSchema FriendList and InvitedList Wrong IDs', (done) => {
    const wrongFriendAndInvitedListSchema = new Profile(profileSchemas.wrongFriendAndInvitedList)
    wrongFriendAndInvitedListSchema.validate((err) => {
      expect(err.errors['friendList.0'].message).to.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors['invitedFriendList.0'].message).to.equal(String(serverErrors.notMongoIdValid))
      done()
    })
  })
})