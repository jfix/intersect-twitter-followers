# Get common followers for two twitter accounts

This is a quick script to identify the followers for two twitter accounts and to list certain properties for each common follower.

The main problem with a script like this is that the Twitter API has become very restrictive and getting a large number of most entities is subject to rate limits. For example, using the `followers/ids` API call allows to get up to 5000 follower IDs per call and you are only allowed to make 15 calls per 15 minute period. Getting 500K followers, for example, will take more than an hour and a half, most of the time waiting.

Also, you'll need to create an `application` on Twitter's dev site, in order to obtain the four different credential keys, tokens and secrets.  Not exactly fun and games ...

The same code in a Runkit notebook:
https://runkit.com/jfix/intersecting-twitter-followers
