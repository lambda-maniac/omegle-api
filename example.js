const askName = async () => {

    let name = await ask("Hello! What's your name?", 20);

    if (!name) endChat();

    say(`How are you, ${name}?`);

    console.log("Chat ended.");
}
