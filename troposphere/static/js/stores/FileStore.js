import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import FileCollection from "collections/FileCollection";
import FileConstants from "constants/FileConstants";


let FileStore = BaseStore.extend({
    collection: FileCollection,

});

let store = new FileStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case FileConstants.ADD_FILE:
            store.add(payload.filejob);
            break;

        case FileConstants.REMOVE_FILE:
            store.remove(payload.filejob);
            break;

        default:
            return true;
    }

    if (!options.silent) {
        store.emitChange();
    }

    return true;
});

export default store;
