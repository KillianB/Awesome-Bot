var RtmClient = require('@slack/client').RtmClient;
var token = process.env.BOT_TOKEN; // Can't integrate the token in repository -> Failed to auth
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
//var text = require('@slack/client').RTM_EVENTS.MESSAGE
var rtm = new RtmClient(token, {
    // Sets the level of logging we require
    logLevel: "error",
    // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
    dataStore: new MemoryDataStore()
});

//Authentication - DO NOT DELETE
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});
// INITIALIZATION - DO NOT DELETE
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    // Listens to all `message` events from the team
});

// Wait for the client to connect - DO NOT DELETE
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    // Get the user's name
    var user = rtm.dataStore.getUserById(rtm.activeUserId);
    // Get the team's name
    var team = rtm.dataStore.getTeamById(rtm.activeTeamId);
    // Log the slack team name and the bot's name
    console.log('Connected to ' + team.name + ' as ' + user.name);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    //Message handler : Logs of all messages sent in channels
    console.log('Message : ' + message.text + '\nFrom : ' + message.user + '\nIn : ' + message.channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    rtm.sendMessage("Hello <@" + message.user + ">!" + " By sending : " + message.text, message.channel);
});
