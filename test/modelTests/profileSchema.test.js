const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const Profile = app.src.models.profileModel
const userErrors = app.coincidents.Utils.errorUtils.userErrors

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
      expect(err.errors.friendList.message).to.equal('Cast to Array failed for value "[ \'591e5c0fa8634f1f988ççççç\', \'591e5ccca8634f1f9880e8ca\' ]" at path "friendList"')
      expect(err.errors.invitedFriendList.message).to.equal('Cast to Array failed for value "[ \'591e5c21a8634f1f9880e8\' ]" at path "invitedFriendList"')
      done()
    })
  })
  //TODO Fazer o happyPath com guessesLeagues e guessesLines populados
})