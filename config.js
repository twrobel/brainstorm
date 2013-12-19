//platform = process.env.PLATFORM ? process.env.PLATFORM : 'safe'

config = {
    // Platform capabilities
    safe : {
        transports : ["xhr-polling"]
    },
    heroku : {
        transports : ["xhr-polling"]
    },
    joyent : {
        transports : ["websocket", "xhr-polling"]
    }
}

if(Meteor.isServer){

    Accounts.loginServiceConfiguration.remove({
            service: "github"
        });

    Accounts.loginServiceConfiguration.insert({
        service: "github",
        clientId: "b153463669ec40cb1f26",
        secret: "82d981a9db288c358ca62f7c1c67c63664b135fc"
    });
}
