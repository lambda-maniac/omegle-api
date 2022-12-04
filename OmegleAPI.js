const getAllLogs = () =>
    [
        ...document.querySelectorAll(
            "div.logbox > div > div.logitem"
        )
    ];

const getInputArea = () =>
    document.querySelector("textarea");

const getSendButton = () =>
    document.querySelector(".sendbtn");

const getAllMessages = () =>
    getAllLogs().map( element => [ element.querySelector( ".msgsource"   )
                                 , element.querySelector( ".notranslate" ) ||
                                   element.querySelector( ".statuslog"   ) ] )

                .map( ([e_author, e_message]) => e_author && e_message
                                               ? { [e_author.innerText.slice(0, -1)] : e_message.innerText }
                                               : e_message
                                               ? { System                            : e_message.innerText }
                                               : null )

                .filter( element => element );

const getAllSystemMessages = () =>
    getAllMessages().filter ( object => object?.System )
                    .map    ( object => object.System  ) ;

const getAllStrangerMessages = () =>
    getAllMessages().filter ( object => object?.Stranger )
                    .map    ( object => object.Stranger  );

const getAllYourMessages = () =>
    getAllMessages().filter ( object => object?.You )
                    .map    ( object => object.You  );

const hasChatEnded = () => {
    const systemMessages = getAllSystemMessages();
    return systemMessages.slice(-3, 3)[0].contains("disconnected")
        || systemMessages.slice(-2, 3)[0].contains("disconnected");
}

const write = (text) => {
    getInputArea().value = text;
}

const send = () => {
    getSendButton().click();
}

const sendMessage = message => {
    write(message); send();
}
