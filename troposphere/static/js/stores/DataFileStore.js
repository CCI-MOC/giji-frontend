import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import DataFileCollection from "collections/DataFileCollection";
import DataFileConstants from "constants/DataFileConstants";

let DataFileStore = BaseStore.extend({
    collection: DataFileCollection,
});

let store = new DataFileStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case DataFileConstants.ADD:
            store.add(payload.file);
            break;

        case DataFileConstants.UPDATE:
            store.update(payload.file);
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

