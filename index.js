const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
	const uuid = uuidv4();

	let data = JSON.parse(fs.readFileSync(filePath));
	addLoginRequest(data, uuid);
	updateAuthoritiesToken(data, uuid);
	
	fs.writeFileSync(`${filePath}_new-auth.json`, JSON.stringify(data));
}

const addLoginRequest = (data, uuid) => {
	let updatedLoginRequest = updateLoginRequestIds(data, uuid);
	data.resources.push(updatedLoginRequest);
	return data;
}

const updateLoginRequestIds = (data, uuid) => {
	// parent id
	let rootItem = data.resources.find(resource => resource.parentId === null && resource._type === "workspace");
	loginRequest.parentId = rootItem._id;

	// uuid
	loginRequest._id = uuid;

	return loginRequest;
}

const updateAuthoritiesToken = (data, uuid) => {
	let object = data.resources.find(resource => resource?.data?.authoritiesToken);
	object.data.authoritiesToken = authTemplate(uuid);
	return object;
}

const args = process.argv.slice(2);

updateWorkspaces(getWorkspaces(args[0]));

