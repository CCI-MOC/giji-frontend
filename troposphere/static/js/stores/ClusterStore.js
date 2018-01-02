import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import ClusterCollection from "collections/ClusterCollection";
import ClusterConstants from "constants/ClusterConstants";
import Utils from "actions/Utils";

let ClusterStore = BaseStore.extend({
    collection: ClusterCollection,

    queryParams: {
        page_size: 1000
    },

    initialize: function() {
        this.pollingEnabled = true;
        this.pollingFrequency = 10 * 1000;
        this.models = new this.collection;
    },

    fetchModels: function() {
        if (!this.models && !this.isFetching) {
            this.isFetching = true;
            var models = new this.collection();
            var queryString = "";

            // Build the query string if queryParameters have been provided
            if (this.queryParams) {
                queryString = this.buildQueryStringFromQueryParams(this.queryParams);
            }

            models.fetch({
                url: models.url + queryString
            }).done(function() {
                this.isFetching = false;
                this.models = models;
                let self = this;
                if (this.pollingEnabled) {
                    this.models.each(function(cluster) {
                        let cluster_status = cluster.get("clusterStatus");
                        if(cluster_status === "Active") {
                            return;
                        }
                        self.pollNowUntilBuildIsFinished(cluster);
                    });
                }
                this.emitChange();
            }.bind(this));
        }
    },

    fetchClusterWhere: function(queryParams) {
        queryParams = queryParams || {};

        // Build the query string
        var queryString = this.buildQueryStringFromQueryParams(queryParams);

        if (this.queryModels[queryString]) return this.queryModels[queryString];

        if (!this.isFetchingQuery[queryString]) {
            this.isFetchingQuery[queryString] = true;
            this.isFetching = true;
            let self = this;
            var models = new this.collection();
            models.fetch({
                url: models.url + queryString
            }).done(function() {
                this.isFetching = false;
                this.models = models;
                this.isFetchingQuery[queryString] = false;
                this.queryModels[queryString] = models;
                if (this.pollingEnabled) {
                    this.models.each(function(cluster) {
                        let cluster_status = cluster.get("clusterStatus");
                        if(cluster_status === "Active") {
                            return;
                        }
                        self.pollNowUntilBuildIsFinished(cluster);
                    });
                }
                this.emitChange();
            }.bind(this));
        }
    },

    isInFinalState: function(cluster) {
        Utils.dispatch(ClusterConstants.UPDATE_CLUSTER, {
            cluster: cluster
        });

        if (cluster.get("clusterStatus") !== "Active") {
            return false;
        }

        return cluster.get("clusterStatus") === "Active";
    },

    pollUntilDeleted: function(cluster) {
        this.pollWhile(cluster, function(model, response) {
            // If 404 then remove the model
            console.log(response.status);
            if (response.status == "404") {

                Utils.dispatch(ClusterConstants.REMOVE_CLUSTER, {
                    cluster: model
                });
                return false;
            }

            cluster.set({
                clusterStatus: "Deleting"
            });

            Utils.dispatch(ClusterConstants.UPDATE_CLUSTER, {
                cluster: cluster
            });

            // Keep polling while 200 or not 404
            return response.status == "200";

        }.bind(this));
    },

});

let store = new ClusterStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case ClusterConstants.ADD_CLUSTER:
            store.add(payload.cluster);
            break;

        case ClusterConstants.UPDATE_CLUSTER:
            store.update(payload.cluster);
            break;

        case ClusterConstants.REMOVE_CLUSTER:
            store.remove(payload.cluster);
            break;

        case ClusterConstants.POLL_CLUSTER:
            store.pollNowUntilBuildIsFinished(payload.cluster);
            break;

        case ClusterConstants.POLL_FOR_DELETED:
            store.pollUntilDeleted(payload.cluster);
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

