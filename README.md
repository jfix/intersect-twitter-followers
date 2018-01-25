# Get common followers for two twitter accounts

This is a quick script to identify the followers for two twitter accounts and to list certain properties for each common follower (`name`, `id_str`,	`followers_count`,	`screen_name`,	`description`,	`url`).

The main problem with a script like this is that the Twitter API has become very restrictive and getting a large number of most entities is subject to rate limits. For example, using the `followers/ids` API call allows to get up to 5000 follower IDs per call and you are only allowed to make 15 calls per 15 minute period. Getting 500K followers, for example, will take more than an hour and a half, most of the time waiting.

Also, you'll need to create an `application` on Twitter's dev site, in order to obtain the four different credential keys, tokens and secrets.  Not exactly fun and games ...

The same code in a Runkit notebook:
https://runkit.com/jfix/intersecting-twitter-followers

I've added the `json2csv` package so you can easily convert the JSON output to CSV by manually running something like this from the command line:

```
$ json2csv -i input.json -o output.csv
```

You can then open the file in Excel (via the import dialog).

The output files for a first test are here:

https://drive.google.com/drive/folders/1d3lm1M_5WhWT7RZ0OqcuUx-m_1Tw7qhM?usp=sharing
