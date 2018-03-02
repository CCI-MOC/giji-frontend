import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import SyncInstanceCollection from "collections/SyncInstanceCollection";
import SyncInstanceConstants from "constants/SyncInstanceConstants";

let SyncInstanceStore = BaseStore.extend({
    collection: SyncInstanceCollection,
});

let store = new SyncInstanceStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case SyncInstanceConstants.ADD:
            store.add(payload.sync);
            break;

        case SyncInstanceConstants.UPDATE:
            store.update(payload.sync);
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

