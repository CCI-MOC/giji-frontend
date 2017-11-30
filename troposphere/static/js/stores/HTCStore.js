import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import HTCCollection from "collections/HTCCollection";
import HTCConstants from "constants/HTCConstants";


let HTCStore = BaseStore.extend({
    collection: HTCCollection,

});

let store = new HTCStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case HTCConstants.ADD_HTC:
            store.add(payload.htcjob);
            break;

        case HTCConstants.REMOVE_HTC:
            store.remove(payload.htcjob);
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

