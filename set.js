const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01XQW96NGJWNElqM0swaGc3UWFVK1dBRjQyOHBia1BIc1ZGNFhoZTYwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKzlwYW4wcG5qMXBvcDQzWUdnSjBWeXl2cU1EZjRFdHJFMTQzR3U2cm9nTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTFFlQ09QaTRDOGNIUGh1ZzVQam5XaG1oM1BFU1RKZHpYcjkwTFZuUUdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTFJzM0ZHWStjODNXVGN3NExiQ29aNXFBTVh3T0JkSDlSY1lZR2VBaGdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQUVpkdWw3TWlhalZhU3I2NkhCVFBINy9HTjRoa1JTaUNhcC9oTjRQMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYrR1gycWxIK1VLNkJJdi9IMnhqMzlzOGJWUG9lTXpUeDF4S20rT0QreFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUhGL01xeHMzYnBsbk9SS0FlQnMwQ1hFUWNBdlpMdTlRTDVmU0d4Z1YxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXBYYWkvcWIwejlaek9TMWJNellJdm5NMjV0YWNTUi8yWlZrall2OVVHVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJLZDYxY1ZVemc5QzlOaFFLT1NQOWNyY1MxMWFndW5YMkNONEVCakpFSXBrcE5BKzlISVlRYmhpOFU3WXZ3STd4MXZwUUNDYUhWc0VIRHhxcWg0NkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJXZDBFVnJVd1Y3dm5FRGl6TUFrYkFnTitpRWxoLytpRnhIK3JEMHhqVDg4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTaU9jYkdYdVJDeTZ4cnliaHJXTVRBIiwicGhvbmVJZCI6ImM3NThlNzE1LTc4ZTItNDRlMi1hN2QxLTRlZDMxYzRmMjFkMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSVo0TnM0OUlXdHlaaGswODBUUWIyLzFtdTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVZmZ3hYdUlITXlMVk1mcGRXOVR2dFJTcWRvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRIRkpLVjVHIiwibWUiOnsiaWQiOiIyNTQ3ODI5MDM0NDM6MjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiX3BsYXlib2nimY3ilrbvuI8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tpUmxXTVEwcXVNdFFZWUNDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVROGpVbEN4T051QWJoeXdOUmU3a3pTaE9KWFNxdVo5bGZRcFFWZFd4aWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhOM0huQWZRQzdtdmZwWEFjdjBpZEo3ODJIbHFkVHZzTy9ybktvczhnNW92NGFLR0pseVErbFB3a0I0TkFadG5zN3RESWhxaCtaSDczVmIwdVY5TkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJLYytnVUxHdlpCYUJIRU9remRnM1lONXN0eVlNQk5VS2xhTWN4amV4TXRNcVBadWk0czRrUHY0bitVVzFZcnJjNXhtU2JsUEJrQW9kZDZ3V0p1c3pCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc4MjkwMzQ0MzoyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWRVBJMUpRc1RqYmdHNGNzRFVYdTVNMG9UaVYwcXJtZlpYMEtVRlhWc1luIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTYzOTk5fQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "PŁÅÝBÓÍ.FŁĚX",
    NUMERO_OWNER : process.env.OWNER_NUM || "254782903443",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'available,
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
