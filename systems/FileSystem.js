import localForage from './localForage.js';

class FileSystem {
	constructor() {
		this.store = localForage;
		this.watchers = {
			// '/example/path/foo/bar/baz.html': […, …]
		};
	}
	
	create(path) { return this.store.setItem(path, '').then(() => this.dispatch({ type: 'create', path })) }
	exists(path) { return this.store.getItem(path) }
	remove(path) { return this.store.removeItem(path).then(() => this.dispatch({ type: 'remove', path })).then(() => delete this.watchers[path]) }
	read(path) { return this.store.getItem(path) }
	write(path, content) { return this.store.setItem(path, content).then(() => this.dispatch({ type: 'update', path })) }
	
	watch(path) {
		var watcher = new Watcher(path);
		if(!(path in this.watchers)) this.watchers[path] = [];
		this.watchers[path].push(watcher);
		return watcher;
	}
	
	dispatch(event) {
		Object
		.keys(this.watchers)
		.filter(path => path.startsWith(event.path))
		.map(path => this.watchers[path])
		.forEach(watchers => watchers.forEach(watcher => {
			if(watcher.on) watcher.on(event);
			var onEvent = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
			if(watcher[onEvent]) watcher[onEvent](event);
		}));
	}
	
	unwatch(watcher) {
		if(!watcher) return;
		watcher.cleanup();
		if(!(watcher.path in this.watchers)) return false;
		var index = this.watchers[watcher.path].indexOf(watcher);
		if(index === -1) return false;
		this.watchers[watcher.path].splice(index, 1);
		return true;
	}
}

class Watcher {
	constructor(path) {
		this.path = path;
		this.isPaused = false;
		this.on = null;
		this.onCreate = null;
		this.onRemove = null;
		this.onUpdate = null;
	}
	
	cleanup() {
		this.path = null;
		this.isPaused = null;
		this.on = null;
		this.onCreate = null;
		this.onRemove = null;
		this.onUpdate = null;
	}
	
	pause() {
		
	}
	
	resume() {
		
	}
	
	cancel() {
		fs.unwatch(this);
	}
}




/*
componentDidMount() {
	this.watcher = FileSystem.watch(this.props.path);
	this.watcher.onChanges = ::this.handleChanges;
}

handleEdit() {
	this.watcher.pause();
	FileSystem.write(this.props.path, this.CodeMirror.contents)
	.then(() => this.watcher.resume());
}

componentWillUnmount() {
	this.watcher.cancel();
	this.watcher = null;
}
*/

const fs = new FileSystem();
export default fs;
