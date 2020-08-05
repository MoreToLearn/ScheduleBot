class Position {
	constructor({id, email, description, claimer, taken = null, msg_id = null}, dir) {
		this._id = id;
		this._email = email;
		this._claimer = claimer;
		this._description = description;
		this._taken = !!taken;
		this._msg_id = msg_id;
		this._path = `${dir}/${id}.json`;
	}
	set claimer(value) {
		this._claimer = value;
	}
	set taken (value) {
		this._taken = !!value;
	}
	set msg_id (value) {
		this._msg_id = value;
	}
	get id() {
		return this._id;
	}
	get msg_id() {
		return this._msg_id;
	}
	get email() {
		return this._email;
	}
	get description() {
		return this._description;
	}
	get taken() {
		return this._taken;
	}
	get path() {
		return this._path;
	}
	get claimer() {
		return this._claimer;
	}
	toString() {
		return JSON.stringify({
			"id": this.id,
			"msg_id": this.msg_id,
			"email": this.email,
			"description": this.description,
			"taken": this.taken,
			"claimer": this.claimer
		});
	}
}

module.exports = Position;