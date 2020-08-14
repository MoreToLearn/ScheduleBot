module.exports = async (member) => {
    try {
        return member.send(`Welcome to ${member.guild.name}! I am MoreToLearn Bot, and I am what we use to keep track of times, assign kids to tutors, and more! You can start off by checking out this channel <#735988498955501680> for more info! If you have any questions, contact a board member right away!`)
    } catch(e) {
        e;
    }
};