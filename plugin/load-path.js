const fs = require('fs');
const path = require('path');
const replaceExt = require('replace-ext');

let miniDir = null;

function _inflateEntries(entries = [], entry) {
	const configFile = replaceExt(entry, '.json');
	const content = fs.readFileSync(configFile, 'utf8');
	const config = JSON.parse(content);
	const items = config.pages;
	if (typeof items === 'object') {
		Object.values(items).forEach(item => {
			inflateEntries(entries, item);
		})
	}
}

function inflateEntries(entries, entry) {
	entry = path.resolve(miniDir, entry);
	if (entry != null && !entries.includes(entry)) {
		replaceExt(entry, '.js');
		entries.push(entry);
		_inflateEntries(entries, entry);
	}
}

function getEntries() {
	const componentsDir = path.resolve(__dirname, '../src/components');
	const utilsDir = path.resolve(__dirname, '../src/utils');

	


}

class LoadPath {
	constructor() {
		this.entries = [];
	}
	init(options) {
		const output = {};
		miniDir = path.resolve('./src');

		// options.src.forEach(element => {
		// 	inflateEntries(this.entries, element);
		// })
		inflateEntries(this.entries, options.src);
		this.entries.map(item => {
			output[replaceExt(path.relative(miniDir, item), '')] = item;
		})
		return output;
	}
}

module.exports = LoadPath;