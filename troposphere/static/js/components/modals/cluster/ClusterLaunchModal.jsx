import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import ClusterLaunchView from "components/common/ClusterLaunchView";


export default React.createClass({
    displayName: "ClusterLaunchModal",

    mixins: [BootstrapModalMixin],

    propTypes: {
        sizes: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    cancel: function() {
        this.hide();
    },

    confirm: function(identity, pluginName, clusterName, clusterSize, clusterStatus) {
        this.hide();
        this.props.onConfirm(identity, pluginName, clusterName, clusterSize, clusterStatus);
    },

    render: function() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <h1 className="t-title">Launch Cluster</h1>
                        </div>
                        <div className="modal-body">
                            <ClusterLaunchView sizes={this.props.sizes} cancel={this.cancel} onConfirm={this.confirm} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

