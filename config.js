const { Sequelize } = require('sequelize')
require('dotenv').config()
const toBool = x => x === 'true'
const DATABASE_URL = process.env.DATABASE_URL || './database.db'
module.exports = {
 BASE_API: process.env.BASE_API || 'https://astro-api-guru.onrender.com',
 SESSION_ID: process.env.SESSION_ID || 'SESSION_19_20_23_eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU05LdTAxVlV1azRaem1iYURodGY3cXhlREFrOEJwS3ZjRnZVcHQyYVNXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmZlR3pUeUdxM2tTakxzTUx4K0lzZ2ZmSEZDWmdaeXlKc29yODdkdUMwMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTTlJaklvRVV2TW5DTW9tMWRid2FBdG1PdTFTc0hQc2YrejlFcHMwR21ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZmpGelBkS0x1THFReWptOE9YaDNJMTI2YkJtUy9nM0FBaFgxd2ZYZHg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVMaDZzbTNLajdIRVh2MlJCQ042L1ZqU1Q0Z29WclJ1NHdjMENFVy9ZWFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZrN2ovdkRHbG1hZHNGbHRnN2czRE9CV01xR0tBTUdEZXBlYk0rSVNEU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUFVM2g2V3Z0NEdINHBUL3MxTGROdm9XMG1TZFk0eEt4alZ4bDNIckRIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUHZ6TG1ISElxTnRPZ3Z3d2EvRmhFUWV5UUtxeXRhdVo0blhhVTlUZmdSRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJoTURZR1U3ZmV1Ti9Wc2tMUzhvcmVYQW9GTHd0NVoxdjNZNXQvTy9Xa0FPZnd6Z0NHK2NQWFJVU1UyZXB3UzUvWTIxb2l4dUYyWXl3ZUt3SVM4cmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJtb2g1dDZ6anZkU2NxNm9jS1hkdVhNVzc2RnQzNzJSY1JORW5SdEFXNkdrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQcXU0aUNCY1JOaVdtZWltUnRER3l3IiwicGhvbmVJZCI6IjFiOTczNWVmLTg5NDctNDMwNS05MTdiLTcxOWZiMWIxODQ5NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYWU9oMU5VOFBvb2Fzcnc5Q0E3d2hkeGlYd3c9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNDSTBKc092T0pERWNVL2dOWWlBZlFMVzU5dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BpcXk3VUJFTEQ5bUxZR0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Iis3dm9Yb3dsRmtFS0FKeVZZNkhodVFQV0NPZnFpK1J5K1JNak9wemFaV1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImloMDNiVVpGQUtRL2xCNXF3dCtRcWN4ZCtQTHVBaWR6RlFvMWlGUVBVaHhxdVJmeXR6QzhlZmplRkRSeEFPankxQzlyNHdEd1U1ZjNNVnFMQm5iUkR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2VU9CaGgzYk5iLzNJUXFEeGlrYllvSFRBcTRST1pWMDRLVWxwYzZDOFdrYjlWV0dDbFRXMkVrVEFPVGw0UHphYWpjeXQ3c2U4VmdNL2krSUlVRHZpUT09In0sIm1lIjp7ImlkIjoiMTgwNjIyMTI2NjA6MjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2ZvPCdmoEg8J2ZvPCdmoTwnZmy8J2Zt/CdmbTwnZqB8J2ZuCIsImxpZCI6IjE5MTIzODEzMzI2NDUzNzoyM0BsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgwNjIyMTI2NjA6MjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZnU3NkY2TUpSWkJDZ0NjbFdPaDRia0QxZ2puNm92a2N2a1RJenFjMm1WbSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MjY4MjIxLCJsYXN0UHJvcEhhc2giOiIzaEx6ZWYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFGSiJ9',
 BOT_INFO: process.env.BOT_INFO || 'ᴀsᴛʀᴏ,ғxᴏᴘ-ᴍᴅ',
 SUDO: process.env.SUDO || '263719647303',
 HANDLERS: process.env.HANDLER || '.',
 ANTILINK_ACTION: process.env.ANTI_LINK || 'kick',
 LANG: process.env.LANG || 'EN',
 BRANCH: 'master',
 WARN_COUNT: 3,
 PACKNAME: process.env.PACKNAME || 'ғxᴏᴘ-ᴍᴅ',
 WELCOME_MSG: process.env.WELCOME_MSG || 'Hi @user Welcome to @gname',
 GOODBYE_MSG: process.env.GOODBYE_MSG || 'Hi @user It was Nice Seeing you',
 AUTHOR: process.env.AUTHOR || 'ᴀsᴛʀᴏ',
 HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
 HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
 HEROKU: toBool(process.env.HEROKU) || false,
 AUTO_READ: toBool(process.env.AUTO_READ) || false,
 AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
 ANTILINK: toBool(process.env.ANTI_LINK) || false,
 LOGS: toBool(process.env.LOGS) || true,
 RMBG_KEY: process.env.RMBG_KEY || false,
 DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
 DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
 REMOVEBG: process.env.REMOVEBG || false,
 DATABASE_URL: DATABASE_URL,
 STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
 WORK_TYPE: process.env.WORK_TYPE || 'public',
 PROCESSNAME: process.env.PROCESSNAME || 'fxop-md',
 DATABASE:
  DATABASE_URL === './database.db'
   ? new Sequelize({
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
     }),
}
