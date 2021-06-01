const fs = require('fs');
const path = require('path');
const replaceExt = require('replace-ext');

const components = [
	'components/list/list',
	'components/navigation/navigation',
	'components/scroll/scroll',
	'components/side-slip/side-slip',
	'components/tab/tab'
];

const utils = [
	'utils/host',
	'utils/request',
	'utils/util'
];

const apis = [
	'api/home',
	'api/official-account',
	'api/index',
	'api/auth',
	'api/favorite-list',
	'api/favorite',
];

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

class LoadPath {
	constructor() {
		this.entries = [];
	}
	init(options) {
		const output = {};
		miniDir = path.resolve('./src');

		inflateEntries(this.entries, options.src);
		this.entries.forEach(item => {
			output[replaceExt(path.relative(miniDir, item), '')] = item;
		});
		components.forEach(item => {
			output[item] = path.resolve(miniDir, item);
		});
		utils.forEach(item => {
			output[item] = path.resolve(miniDir, item);
		});
		apis.forEach(item => {
			output[item] = path.resolve(miniDir, item);
		})
		console.log(`output ======== ${JSON.stringify(output)}`);
		return output;
	}
}

module.exports = LoadPath;