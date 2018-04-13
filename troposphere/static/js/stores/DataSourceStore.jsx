import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import DataSourceCollection from "collections/DataSourceCollection";
import DataSourceConstants from "constants/DataSourceConstants";


let DataSourceStore = BaseStore.extend({
    collection: DataSourceCollection,

});

let store = new DataSourceStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case DataSourceConstants.ADD_DATA:
            store.add(payload.datasourcejob);
            break;

        case DataSourceConstants.REMOVE_DATA:
            store.remove(payload.datasourcejob);
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
