# ScheduleBot
A bot to create positions and allow others to claim them.

# Usage
Default Prefix: `!`

`!create <contact-email/phone-number> <description of position>` (has id at bottom of message posted in channel)
`!claim <id>`
`!delete <id>`

# Setup  
- Need to supply discord bot **token** in a .env file
- Supply all needed embed fields (can look at [config.js](https://github.com/zaida04/ScheduleBot/blob/master/config.js) for required ones)
- run `pnpm i` **not npm i**
- run `pnpm start`

# License
[MIT](https://github.com/zaida04/ScheduleBot/blob/master/LICENSE)

Originally created for MoreToLearn