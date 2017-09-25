'use Strict';

const Promise = require('bluebird')
const Boom = require('boom')

module.exports = (app) => {
  const Profile = app.src.models.profileModel;
  const Notifications = app.src.models.notificationsModel;
  const FRIENDSHIP_TYPE = app.coincidents.Config.notificationTypes.friendShipRequest;

  const addFriend = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    const getInvitatorPromise = _getUser(request.userName, dictionary);
    const getInvitedPromise = _getUser(request.invitedUserName, dictionary);

    return Promise.all([getInvitatorPromise, getInvitedPromise])
      .spread((invitatorUser, invitedUser) => _updateDate(invitatorUser, invitedUser, dictionary))
      .spread((invitatorResult, invitedResult) => _checkResponse(invitatorResult, invitedResult))
  }

  const _updateDate = (invitatorUser, invitedUser, dictionary) => {
    const alreadyFriends = invitatorUser.friendList.find((invitatorFriendId) => invitatorFriendId === invitedUser.id)
    if (alreadyFriends) {
      throw Boom.notAcceptable(dictionary.alreadyFriends)
    }
    const saveInvitatorPromise = _saveInvitatorUserProfile(invitatorUser, invitedUser)
    const updateInvitedPromise = _updateInvitedUserNotifications(invitatorUser, invitedUser, dictionary)

    return Promise.all([saveInvitatorPromise, updateInvitedPromise])
  }

  const _checkResponse = (invitatorResult, invitedResult) => {
    const responseObj = {
      invitedSent: false
    }
    if (invitatorResult.nModified && invitedResult) {
      responseObj.invitedSent = true;
    }

    return responseObj
  }

  const _getUser = (userName, dictionary) =>
    Profile.findOne({
      userName
    }).then((user) => {
      if (!user) {
        const errMsg = dictionary.userNotFound.replace('{{userName}}', userName)
        throw Boom.notFound(errMsg)
      }

      return user;
    })

  const _updateInvitedUserNotifications = (invitatorUser, invitedUser, dictionary) => {
    const searchQuery = {
      userRef: invitedUser.id
    }
    const newNotification = {
      saw: false,
      messageType: FRIENDSHIP_TYPE,
      messageUserRef: invitatorUser.id
    }

    return Notifications.findOne(searchQuery)
      .then((userNotifications) => {
        const nofitications = userNotifications.notifications
        const alreadyExists = nofitications.find((notification) =>
          notification.messageType === FRIENDSHIP_TYPE && invitatorUser.id === notification.messageUserRef)
        if (alreadyExists) {
          throw Boom.notAcceptable(dictionary.notificationExists)
        }
        userNotifications.notifications.unshift(newNotification)

        return userNotifications.save()
      })
  }

  const _saveInvitatorUserProfile = (invitatorUser, invitedUser) => {
    if (!Array.isArray(invitatorUser.invitedFriendList)) {
      invitatorUser.invitedFriendList = [];
    }

    const searchQuery = {
      _id: invitatorUser._id
    }

    const updateQuery = {
      '$addToSet': {
        invitedFriendList: invitedUser.id
      }
    }

    const optionsQuery = {
      runValidators: true
    }

    return Profile.update(searchQuery, updateQuery, optionsQuery)
  }


  return {
    addFriend
  }
}