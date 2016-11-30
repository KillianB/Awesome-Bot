var IncomingWebhooks = require('@slack/client').IncomingWebhook;
// Anyone who has access to this url will be able to post your
// slack org without authentication. So don't save this value in version control
var wh = new IncomingWebhooks('https://hooks.slack.com/services/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', {
    username: 'Custom Username',
    channel: '#general',
    iconEmoji: ':robot_face:',
    text: 'Default Text'
});
// This will send a message "Some Text" using the configuration
// chosen when creating the webhook
wh.send(payload = {
    "text": "This is a line of text.\nAnd this is another one."
});

// You can pass an optional callback
wh.send('More text', function () {
    console.log('done sending');
});
