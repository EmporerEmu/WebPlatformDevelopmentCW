const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
	.create({
		body: "Thisis the ship that made the Kessel run in fourteen parsecs?",
		from: "+14402524245",
		to: "+447507145271",
	})
	.then((message) => console.log(message.sid));
