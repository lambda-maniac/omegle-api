const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const mimic = async () => {
  
    let curr = null;
    let last = null;

    while (!hasChatEnded())
    {
        curr = getAllStrangerMessages().slice(-1)[0];

        if (curr != last)
        {
            last = curr;

            sendMessage(curr);
        }

        await sleep(1000);
    }

    console.log("Chat ended.");
}
