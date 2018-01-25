require('dotenv').config()
const Twit = require('twit')
const _ = require('lodash')
const fs = require('fs')

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
})
const getFollowers = require('twitter-followers')

// const op = 'jfix'
// const oe = 'cmarchand7276'
const oe = 'OECD'
const op = 'OECD_pubs'

let oeFollowers = []
let opFollowers = []
let commonFollowerIds = []
let commonFollowers = []

// first, get OECD_pubs followers
getFollowers(T, op)
    .then((followers) => {
        opFollowers = followers
        console.log(`Got ${opFollowers.length} followers for @${op}.`)

        // second, get OECD's followers
        getFollowers(T, oe)
        .then((followers) => {
            oeFollowers = followers
            console.log(`Got ${oeFollowers.length} followers for @${oe}.`)

            // extract common followers
            commonFollowerIds = _.intersection(opFollowers, oeFollowers)

            // some basic infos:
            console.log(`# followers @${oe}: ${oeFollowers.length}.`)
            console.log(`# followers @${op}: ${opFollowers.length}.`)
            console.log(`# of common followers: ${commonFollowerIds.length}.`)

            // more info (per follower) to be collected below

            // take the array of commonFollowers and chunk it into smaller arrays of max 100
            // because the users/lookup api endpoint accepts max 100 users in one go
            const batchFollowerIds = _.chunk(commonFollowerIds, 100)
            _.forEach(batchFollowerIds, (oneHundred) => {
                const params = { user_id: oneHundred.join(','), include_entities: false }
                T.post('users/lookup', params, function(err, users, response) {
                    if (err) throw err
                    _.forEach(users, (user) => {
                        // have a look here to see what other fields could be extracted:
                        // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup
                        commonFollowers.push({
                            name: user.name,
                            id_str: user.id_str,
                            followers_count: user.followers_count,
                            screen_name: user.screen_name,
                            description: user.description,
                            url: user.url
                        })
                    })
                    // console.log(commonFollowers)
                    fs.writeFile(`${oe}-${op}-common-followers.json`, JSON.stringify(commonFollowers), (err) => {
                      if (err) throw err
                      console.log('Result file successfully saved.')
                    })
                })
            })
        })
    })
