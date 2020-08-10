module.exports = (channel, user) => {
    return new Promise((resolve) => {
        channel.awaitMessages(m => m.author.id === user.id, {
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(collected => {
            resolve(collected.first());
        })
        .catch(collected => {
            resolve(collected.first());
        });
    });
};