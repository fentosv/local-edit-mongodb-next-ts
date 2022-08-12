//? If we want to use TypeScript, we can
// Option 1 
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname + '/.env' });

// Option 2 
// import 'dotenv/config'

require('dotenv').config();
const axios = require('axios');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const DISCORD_VERCEL_URL = 'https://' + process.env.NEXT_PUBLIC_GITHUB_PROJECT_NAME + '.vercel.app/'
const DISCORD_USERNAME = process.env.DISCORD_USERNAME
const DISCORD_AVATAR_URL = process.env.DISCORD_AVATAR_URL

const { version, name } = require('../package.json');

const send_discord = () => {
    axios.post(
        DISCORD_WEBHOOK_URL,
        JSON.stringify(
            {
                // the username to be displayed
                username: DISCORD_USERNAME,
                // the avatar to be displayed
                avatar_url: DISCORD_AVATAR_URL,

                // embeds to be sent
                embeds: [
                    {
                        timestamp: new Date(),
                        // decimal number colour of the side of the embed
                        color: 65413,
                        // author: {
                        //     name: 'Nombre autor'
                        // },
                        // embed title
                        // - link on 2nd row
                        title: `${name} ${version} version released! 🟢`,
                        description: `Check it on [Vercel web link](${DISCORD_VERCEL_URL})`,


                        // thumbnail: {
                        //     url:
                        //         imgURL || "Failed to get imgURL",
                        // },

                        fields: [
                            // {
                            //     name: 'Name',
                            //     value: name,
                            //     inline: true
                            // }
                        ],

                        // footer
                        // - icon next to text at bottom
                        footer: {
                            text: DISCORD_USERNAME,
                            icon_url: DISCORD_AVATAR_URL,
                        },
                    },
                ],
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
};


const run_discord = (success) => {
    if (!success) console.log("\nSomething went wrong. Check if you are logged into Git.\n");
    if (DISCORD_WEBHOOK_URL && DISCORD_USERNAME) {
        send_discord(version)
        console.log('\nDiscord sent');

    } else {
        console.log("\nDiscord not sent. Missing required fields in .env file.\n");
    }
}

module.exports = { run_discord }



