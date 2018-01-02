import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import SaharaPluginCollection from "collections/SaharaPluginCollection";
import SaharaPluginConstants from "constants/SaharaPluginConstants";

let SaharaPluginStore = BaseStore.extend({
    collection: SaharaPluginCollection,
});

let store = new SaharaPluginStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case SaharaPluginConstants.ADD:
            store.add(payload.job);
            break;

        case SaharaPluginConstants.UPDATE:
            store.update(payload.job);
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
