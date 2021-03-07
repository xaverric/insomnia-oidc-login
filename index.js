const fs = require("fs");
const path = require('path');

let { loginRequest, authTemplate } = require("./data.js");

const getWorkspaces = (dirPath) => {
    let filePaths = [];
    fs.readdirSync(dirPath).forEach(fileName => {
        filePaths.push(`${dirPath}${path.sep}${fileName}`)
    });
    return filePaths;
};

const updateWorkspaces = (filePaths) => {
	filePaths.forEach(filePath => {
		updateWorkspace(filePath);
	});
};

const updateWorkspace = (filePath) => {
	let data = JSON.parse(fs.readFileSync(filePath));
	addLoginRequest(data);
	updateAuthoritiesToken(data);
	
	fs.writeFileSync(`${filePath}_new-auth.json`, JSON.stringify(data));
}

const addLoginRequest = (data) => {
	let updatedLoginRequest = updateLoginRequestParentId(data);
	data.resources.push(updatedLoginRequest);
	return data;
}

const updateLoginRequestParentId = (data) => {
	let rootItem = data.resources.find(resource => resource.parentId === null && resource._type === "workspace");
	loginRequest.parentId = rootItem._id;
	return loginRequest;
}

const updateAuthoritiesToken = (data) => {
	let object = data.resources.find(resource => resource?.data?.authoritiesToken);
	object.data.authoritiesToken = authTemplate.authoritiesToken;
	return object;
}

const args = process.argv.slice(2);

updateWorkspaces(getWorkspaces(args[0]));

