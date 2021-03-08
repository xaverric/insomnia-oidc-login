const loginRequest = {
    "_id": "login_request_id",
    "_type": "request",
    "authentication": {
        "disabled": true,
        "prefix": "",
        "token": "",
        "type": ""
    },
    "body": {
        "mimeType": "application/json",
        "text": "{\n\t\"accessCode1\": \"...\",\n\t\"accessCode2\": \"...\",\n\t\"grant_type\": \"password\"\n}"
    },
    "created": 0,
    "description": "",
    "headers": [
        {
            "id": "pair_key_id",
            "name": "Content-Type",
            "value": "application/json"
        }
    ],
    "isPrivate": false,
    "metaSortKey": 1,
    "method": "POST",
    "modified": 0,
    "name": "login",
    "parameters": [],
    "settingDisableRenderRequestBody": false,
    "settingEncodeUrl": true,
    "settingFollowRedirects": "global",
    "settingRebuildPath": true,
    "settingSendCookies": false,
    "settingStoreCookies": false,
    "url": "{{ host  }}/uu-oidc-maing02/11111111111111111111111111111111/oidc/grantToken/"
};

const authTemplate = (uuid) => {
    return `{% response 'body', '${uuid}', 'b64::JC5pZF90b2tlbg==::46b', 'always', 60 %}`
};


module.exports = {
    loginRequest,
    authTemplate
};