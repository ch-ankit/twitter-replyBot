import fetch from "node-fetch";
import twit from "twit";
import config from "./config.js";

console.log('The bot is starting');
var T = new twit(config);
var date = new Date();
date = `${date.getFullYear()}-` + `${date.getMonth()+1}-` + `${date.getDate()}`;

var stream = T.stream('statuses/filter', { track: '@chankit68270532' }) //Your Username: instead of @chankit68270532
stream.on('tweet', replyMentions)
async function getQuotes(){
  var quote= await fetch("https://type.fit/api/quotes")
    var quoteJson = await quote.json()
    return quoteJson
}
var quotes=await getQuotes()
var quoteToDisplay=quotes[Math.floor(Math.random()*quotes.length)]
function replyMentions() {
    // check for mentions
    // T.get('statuses/user_timeline', { count: 10}, function(err, data, response) {
    //     console.log(data)
    //     if (data){
    //         data.forEach(function (mention) {
    //             //Delete past tweets
    //                 T.post('statuses/destroy/:id', { id: mention.id_str }, function (err, data, response) {
    //                 })
    //         })
    //     }
    // })
    // you can add parameter 'since_id' to limit returns
    T.get('statuses/mentions_timeline', { count: 1 }, function (err, data, response) {
        if (data) {
            var filederedTweets= data.filter((tweet)=>{
                //filter tweet witin last 10 minutes
                return new Date(tweet.created_at).getTime() > new Date().getTime() - 10 * 60 * 1000
            })
            filederedTweets.forEach(function (mention) {
                //reply if mention.id_str is not yet replied
                console.log(mention)
                var reply = `@${mention.user.screen_name} ${mention.user.screen_name} .Thanks for reaching out! You mentiond me at: ${date}. Your quote for today is: ${quoteToDisplay.text} - ${quoteToDisplay.author??'Unknown'}`
                T.post('statuses/update', { status: reply, in_reply_to_status_id: mention.id_str }, function (err, data, response) {
                })
            })
        }
    })
}

