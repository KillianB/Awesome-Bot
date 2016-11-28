var RtmClient = require('@slack/client').RtmClient;
var token = process.env.OPENSHIFT_ENV_VAR; // Can't integrate the token in repository -> Failed to auth
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
    console.log('Message : ' + message.text + ' from ' + message.user + ' in : ' + message.channel);

    if (message.text == "!Help"){
        rtm.sendMessage("L'aide n'est pas encore disponible <@" + message.user + "> !!\n Cependant, " +
            "tu peux toujours envoyer un message à @killian.barreau pour plus d'informations", message.channel)
    } else if (message.text == "!Extranet"){
        rtm.sendMessage("L'extranet est disponible grâce à ce lien :\n https://extranet.ynov.com/", message.channel)

    } else if (message.text == "!Mail"){
        rtm.sendMessage("Hey ! Voilà l'adresse de ta messagerie Ynov :\n https://outlook.office365.com/owa/?realm=ynov.com", message.channel)

    } else if (message.text == "!Sp"){
        rtm.sendMessage("Le sharepoint est disponible à cette adresse : *\n https://auvencecom.sharepoint.com/sites/Nantes/default.aspx", message.channel)

    } else if (message.text == "!Hp"){
        rtm.sendMessage("Voici ton planning pour la semaine <@" + message.user  + "" +
            "\n https://scolarite.ynov.com/etudiant?identifiant=cbnQWV6TQcC9u4BT", message.channel)

    } else if (message.text == "!Fb"){
        rtm.sendMessage("Voila les différentes pages Facebook associées à Ynov Nantes :\n Page officielle :" +
            "https://www.facebook.com/nantes.ynov/?ref=page_internal\n BDE : https://www.facebook.com/groups/bde.ynov.nantes/" +
            "\n BDS :https://www.facebook.com/groups/1218659048150191/?ref=bookmarks ", message.channel)

    } else if (message.text == "!Twitter"){
        rtm.sendMessage("Voila la page twitter de Ynov Nantes : \n https://twitter.com/Ynov_Nantes", message.channel);

    } else if (message.text == "!Agenda"){
        rtm.sendMessage("Hey, voilà l'agenda du mois ! N'hésite pas à profiter des différents évènements" +
            "\n https://calendar.google.com/calendar/embed?src=ynov-nantes.com_md68gq1ud5qc7830ud1jr2dfrg@group.calendar.google.com&ctz=Europe" +
            "/Paris&pli=1", message.channel);

    } else if (message.text == "!Vacances"){
        rtm.sendMessage("Voici les vacances pour chaque promotions :\n Ingésup B1 : du 19 au 31 décembre\n Ingésup B2 :\n Ingésup B2" +
            "\n Ingésup B3 :\n Ingésup M1 :\n Ingésup M2 :\n Lim'Art B1 :\n Lim'Art B2 :\n ISEE B1 :\n ISEE B2 :\n ISEE B3 :\n ISEE M1 :\n" +
            "ISEE M2 :\n", message.channel);

    }
});