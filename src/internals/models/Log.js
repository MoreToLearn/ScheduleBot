class Log {
	constructor({id, name, description, time, verifier = null, msg_id}, dir) {
		this._id = id;
        this._description = description;
        this._name = name;
        this._time = time;
        this._verifier = verifier;
		this._msg_id = msg_id;
		this._path = `${dir}/${id}.json`;
	}
	get id() {
		return this._id;
	}
	get msg_id() {
		return this._msg_id;
    }
    get time() {
        return this._time;
    }
    get name() {
        return this._name;
    }
    get verifier() {
        return this._verifier;
    }
	get description() {
		return this._description;
	}
	get path() {
		return this._path;
	}
	toString() {
		return JSON.stringify({
			"id": this.id,
            "msg_id": this.msg_id,
            "name": this.name,
            "time": this.time,
			"description": this.description,
			"verifier": this.verifier,
		});
	}
}

module.exports = Log;