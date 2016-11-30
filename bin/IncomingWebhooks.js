var IncomingWebhooks = require('@slack/client').IncomingWebhook;
// Anyone who has access to this url will be able to post your
// slack org without authentication. So don't save this value in version control
var wh = new IncomingWebhooks('https://hooks.slack.com/services/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');
// This will send a message "Some Text" using the configuration
// chosen when creating the webhook
wh.send(payload = {
    "channel" : "#general",
    "attachments":
    [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Vous trouverez l'aide à cette adresse !",
            "title": "Slack API Documentation",
            "title_link": "https://github.com/KillianB/Awesome-Bot",
            "text": "This help is located in GitHub",
            "fields": [
                {
                    "title": "Help me",
                    "value": "Please contact @killian.barreau",
                    "short": false
                }
            ]
        }
    ]
});

// You can pass an optional callback
wh.send('More text', function () {
    console.log('done sending');
});
