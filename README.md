# ScheduleBot
A bot to create positions and allow others to claim them.

# Usage
Default Prefix: `!`

`!create <contact-email/phone-number> <description of position>` (has id at bottom of message posted in channel)
`!claim <id>`
`!delete <id>`

# Setup  
- Need to supply discord bot **token** in a .env file
- In same .env file supply channel id for embeds to go 
- Can change prefix by just editing `line 8` in `src/index.js` (yes i'm too lazy to add it to the .env)

# License
[MIT](https://github.com/zaida04/ScheduleBot/blob/master/LICENSE)

Originally created for MoreToLearn