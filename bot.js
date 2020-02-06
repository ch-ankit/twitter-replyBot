const twit = require("twit");
var config = require('./config')

console.log('The bot is starting');

var T = new twit(config);
var date = new Date();
date = `${date.getFullYear()}-` + `${date.getMonth()}-` + `${date.getDay()}`;

var stream = T.stream('statuses/filter', { track: `@chankit68270532` }) //Your Username: instead of @chankit68270532
stream.on('tweet', replyMentions)

function replyMentions() {
    // check for mentions
    // you can add parameter 'since_id' to limit returns
    T.get('statuses/mentions_timeline', { count: 100 }, function (err, data, response) {
        if (data) {
            data.forEach(function (mention) {
                // reply if mention.id_str is not yet replied
                reply = `@${mention.user.screen_name} .Thanks for reaching out! You mentiond me at: ${date}`
                T.post('statuses/update', { status: reply, in_reply_to_status_id: mention.id_str }, function (err, data, response) {
                })
            })
        }
    })
}

