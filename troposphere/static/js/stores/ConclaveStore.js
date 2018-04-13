import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import ConclaveCollection from "collections/ConclaveCollection";
import ConclaveConstants from "constants/ConclaveConstants";


let ConclaveStore = BaseStore.extend({
    collection: ConclaveCollection,

});

let store = new ConclaveStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case ConclaveConstants.ADD_CONCLAVE:
            store.add(payload.conclavejob);
            break;

        case ConclaveConstants.REMOVE_CONCLAVE:
            store.remove(payload.conclavejob);
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
