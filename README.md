# ZA Election Status Bot

Periodic election status updates sent to a Slack channel, powered by News24 and Firebase.

## Data Source

This project uses news24 to get the latests election results in JSON format.

We use <https://www.news24.com/Elections/Ajax/ElectionResultsData/GetLiveUpdate?language=en&year=2019&electionType=National> and get

```json
{
  "LastUpdated": "Sat, 11 May 13:54",
  "LastUpdatedTicks": "636931796400000000",
  "Results": [
    {
      "Key": "EC",
      "Value": {
        "HasVotes": true,
        "Party1": {
          "Color": "#54a954",
          "Logo": "https://www.news24.com/Elections/PartyLogo.axd?v=8&id=ANC",
          "Name": "ANC",
          "Percentage": "69.26",
          "Votes": 1399455,
          "VotesDisplay": "1  399 455"
        },
        "Party2": {
          "Color": "#0159a0",
          "Logo": "https://www.news24.com/Elections/PartyLogo.axd?v=8&id=DA",
          "Name": "DA",
          "Percentage": "15.01",
          "Votes": 303309,
          "VotesDisplay": " 303 309"
        },
        "VotePercentageDifference": "15.73"
      }
    },
    {
      "Key": "WC"
      // ...snip...
    },
    // ...snip...
    {
      "Key": "SA"
      // ...snip...
    }
  ]
}
```

## Posting to Slack

This project uses `Incoming Webhooks` to post to slack, see [their documentation](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack) for more information.

## Scheduling Executions

Firebase functions are used to check for and posts results every 10 minutes, for more information see the [Scheduling Cloud Functions for Firebase (cron)](https://firebase.googleblog.com/2019/04/schedule-cloud-functions-firebase-cron.html) blog post.

## Deploy

To deploy, first set up a firebase project on the [blaze plan](https://firebase.google.com/pricing) and then inside the `functions` folder run

```console
npm install
npm run build
npm run deploy
```