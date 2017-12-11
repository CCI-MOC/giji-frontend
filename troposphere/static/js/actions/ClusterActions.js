import NotificationController from "controllers/NotificationController";
import globals from "globals";
import Utils from "./Utils";
import ClusterConstants from "constants/ClusterConstants";
import Cluster from "models/Cluster";

export default {

    destroy: function(params) {
        var cluster = params.cluster;
        var stackID = cluster.get("stackID");

        var url = globals.API_V2_ROOT + "/sahara_clusters/" + stackID;

        var originalState = cluster.get("clusterStatus");

        cluster.set({clusterStatus: "Deleting"});

        Utils.dispatch(ClusterConstants.UPDATE_INSTANCE, {
            cluster: cluster
        });

        cluster.destroy({
            url: url
        }).done(function() {
            Utils.dispatch(ClusterConstants.POLL_FOR_DELETED, {
                cluster:cluster
            });
        }).fail(function() {
            cluster.set({
                clusterStatus: originalState
            });

            Utils.dispatch(ClusterConstants.UPDATE_CLUSTER, {
                cluster: cluster
            });

            Utils.dispatch(ClusterConstants.POLL_CLUSTER, {
                cluster: cluster
            });

        });
    },

    launch: function(params) {
        if (!params.pluginName)
            throw new Error("Missing Plugin Name");
        if (!params.clusterName)
            throw new Error("Missing Cluster Name");

        var identity = params.identity,
            pluginName = params.pluginName,
            clusterName = params.clusterName,
            clusterSize = params.clusterSize,
            workerNum = params.workerNum,
            clusterStatus = params.clusterStatus;

        let cluster = new Cluster({
            identity: identity,
            pluginName: pluginName,
            clusterName: clusterName,
            clusterSize: clusterSize,
            workerNum: workerNum,
            clusterStatus: clusterStatus
        });

        Utils.dispatch(ClusterConstants.ADD_CLUSTER, {
            cluster: cluster
        });

        cluster.save().done(function(attrs, status, response) {
            NotificationController.success(null, "Cluster " + cluster.get('clusterName') + " is building");
            cluster.set({id: attrs[0].id});
            cluster.set({stackID: attrs[0].stackID});
            cluster.set({pluginName: attrs[0].pluginName});
            cluster.fetch().then(function() {
                Utils.dispatch(ClusterConstants.UPDATE_CLUSTER, {
                    cluster: cluster
                });

                Utils.dispatch(ClusterConstants.POLL_CLUSTER, {
                    cluster: cluster
                });
            }, function() {
                Utils.dispatch(ClusterConstants.POLL_CLUSTER, {
                    cluster: cluster
                });
            });
        }).fail(function() {
            var message = "Error launching cluster " + cluster.get("clusterName") + ".";

            NotificationController.error(null, message);
            Utils.dispatch(ClusterConstants.REMOVE_CLUSTER, {
                cluster: cluster
            });
        });
    },
};

