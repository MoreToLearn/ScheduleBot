const fs = require("fs");
const Position = require("../models/Position");

class PositionManager {
	constructor() {
		this._dir = `${__dirname}/../../../positions`;
	}
	get dir() {
		return this._dir;
	}
	get(id) {
		return fs.existsSync(`${this.dir}/${id}.json`) ? new Position(JSON.parse(fs.readFileSync(`${this.dir}/${id}.json`))) : null;
	}
	has(id) {
		return fs.existsSync(`${this.dir}/${id}.json`);
	}
	create(id, {email, description, msg_id}) {
		let temp = new Position({"id": id, "email": email, "description": description, "msg_id": msg_id}, this._dir);
		fs.writeFileSync(`${this.dir}/${id}.json`, temp.toString());
		return temp;
	}
	delete(id) {
		return fs.existsSync(`${this.dir}/${id}.json`) ? fs.unlinkSync(`${this.dir}/${id}.json`) : null;
	}
	edit(id, {email, description, msg_id, taken, claimer}) {
		if(!this.has(id)) return;
		let retrieve = this.get(id);
		let temp = {
			"id": retrieve.id
		};
		temp["email"] = email ? email : retrieve.email;
		temp["description"] = description ? description : retrieve.description;
		temp["msg_id"] = msg_id ? msg_id : retrieve.msg_id;
		temp["taken"] = taken ? !!taken : retrieve.taken;
		temp["claimer"] = claimer ? claimer : retrieve.claimer
		temp = new Position(temp, this.dir);
		return fs.writeFileSync(`${this.dir}/${id}.json`, temp.toString());
	}
}

module.exports = PositionManager;