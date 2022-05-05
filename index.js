const express = require("express");
const app = express();
const Instagram = require('instagram-web-api');
const FileCookiesStore = require("tough-cookie-filestore2");
const cron = require("node-cron");
const axios = require("axios");

require("dotenv").config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const port = process.env.PORT || 4000;

// cron.schedule("00 12 ***", async () => {

// });

const {
    INSTAGRAM_USERNAME,
    INSTAGRAM_PASSWORD
} = process.env;

const cookieStore = new FileCookiesStore("./cookies.json")

const client = new Instagram({
    username: INSTAGRAM_USERNAME,
    password: INSTAGRAM_PASSWORD,
    cookieStore
}, {
    language: "en -US"
});

const instagramPostFunction = async () => {
    await client.uploadPhoto({
        photo: "./r2d2.jpeg",
        caption: "Test Caption Text #UOLHackathon #JustCodeIt #Secondtest #HardCode #NodeJS",
        post: "feed"
    }).then(async (res) => {
        const media = res.media;

        console.log(`https://instagram.com/p/${media.code}`)

        // await client.addComment({
        //     mediaId: media.id,
        //     text: "#UOLHackathon #JustCodeIt"
        // });
    })
}

const loginFunction = async () => {
    await client.login().then(() => {
        console.log("Log Success");

        instagramPostFunction();
    }).catch(error => console.log(error));
};

loginFunction();



app.listen(port, () => {
    console.log(`PostaAqui listen on port ${port}`);
});