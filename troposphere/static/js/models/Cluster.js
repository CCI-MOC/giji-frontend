import Backbone from "backbone";
import globals from "globals";

export default Backbone.Model.extend({
    urlRoot: globals.API_V2_ROOT + "/sahara_clusters",

    fetchFromCloud: function(cb) {
        var clusterId = this.get("id");

        var url = (
            globals.API_V2_ROOT +
            "/sahara_clusters/" + clusterId
        );

        Backbone.sync("read", this, {
            url: url
        }).done(function(attrs, status, response) {
            this.set("clusterStatus", attrs[0].clusterStatus);
            this.set("clusterMasterIP", attrs[0].clusterMasterIP);
            cb(response);
        }.bind(this)).fail(function(response, status, errorThrown) {
            cb(response);
        });
    },
});

