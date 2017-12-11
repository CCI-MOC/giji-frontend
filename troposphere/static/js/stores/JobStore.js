import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import JobCollection from "collections/JobCollection";
import JobConstants from "constants/JobLaunchConstants";

let JobStore = BaseStore.extend({
    collection: JobCollection,


    findJobsWhere: function(params) {
        if (!this.models) return this.fetchModels();

        var keys = Object.keys(params);

        var models = this.models.cfilter(function(model) {
            var matchesCriteria = true;

            keys.forEach(function(key) {
                if (!matchesCriteria) return;

                var tokens = key.split(".");
                if (tokens.length === 1) {
                    if (model.get(key) !== params[key])
                        matchesCriteria = false;
                } else {
                    matchesCriteria = false;
                }
            });

            return matchesCriteria;
        });

        return models;
    }

});

let store = new JobStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case JobConstants.ADD:
            store.add(payload.job);
            break;

        case JobConstants.UPDATE:
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
