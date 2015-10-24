/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listMessages(userId, query, callback) {
    var getPageOfMessages = function(request, result) {
        request.execute(function(resp) {
            result = result.concat(resp.messages);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'labelIds': "INBOX",
                    'q': query
                });
                getPageOfMessages(request, result);
            } else {
                callback(result);
            }
        });
    };
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': query
    });
    getPageOfMessages(initialRequest, []);
}
/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Integer} Maximum number of results to return.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listMessages(userId, query,maxResults, callback) {
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'maxResults':maxResults,
        'labelIds':"INBOX",
        'q': query
    });
    initialRequest.execute(callback);
}
/**
 * Get all the Labels in the user's mailbox.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listLabels(userId, callback) {
    var request = gapi.client.gmail.users.labels.list({
        'userId': userId
    });
    request.execute(function(resp) {
        var labels = resp.labels;
        callback(labels);
    });
}
/**
 * Modify the Labels a Message is associated with.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to modify.
 * @param  {Array} labelsToAdd Array of Labels to add.
 * @param  {Array} labelsToRemove Array of Labels to remove.
 * @param  {Function} callback Function to call when the request is complete.
 */
function modifyMessage(userId, messageId, labelsToAdd, callback) {
    var request = gapi.client.gmail.users.messages.modify({
        'userId': userId,
        'id': messageId,
        'addLabelIds': labelsToAdd
    });
    request.execute(callback);
}
/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
function getMessage(userId, messageId, callback) {
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(callback);
}