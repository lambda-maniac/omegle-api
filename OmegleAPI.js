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

const getNextButton = () =>
    document.querySelector(".disconnectbtn");

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

const isChatOver = () => {
    const systemMessages = getAllSystemMessages();
    return systemMessages.includes("You have disconnected.")
        || systemMessages.includes("Stranger has disconnected.");
}

const write = text => {
    getInputArea().value = text;
}

const send = () => {
    getSendButton().click();
}

const say = message => {
    write(message); send();
}

const nextChat = () => {
    getNextButton().click();
}

const confirmNextChat = () => {
    nextChat();
}

const endChat = () => {
    nextChat(); confirmNextChat();
}

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const ask = async (question, waiting) => {
    if (isChatOver()) return null;

    say(question);

    let last = getAllStrangerMessages().slice(-1)[0];
    let curr = last;

    while (curr == last)
    {
        curr = getAllStrangerMessages().slice(-1)[0];

        if (waiting-- < 0) return null;

        await sleep(1000);
    }

    return curr;
}
