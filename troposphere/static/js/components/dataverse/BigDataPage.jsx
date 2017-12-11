import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import modals from "modals";
import stores from "stores";
import StatusLight from "components/projects/common/StatusLight";
import StatusBar from "./common/StatusBar";
import actions from "actions";

import horizon from "themeImages/horizon.jpg";

export default React.createClass({
    displayName: "BigDataPage",

    getInitialState: function() {
        var sizes = stores.SizeStore.getAll();
        var clusters = stores.ClusterStore.fetchClusterWhere();
        var plugins = stores.SaharaPluginStore.getAll();
        return {
            clusters: clusters,
            sizes: sizes,
            plugins: plugins
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.SizeStore.addChangeListener(this.updateState);
        stores.ClusterStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.SizeStore.removeChangeListener(this.updateState);
        stores.ClusterStore.removeChangeListener(this.updateState);
    },

    destroyCluster: function(cluster) {
        actions.ClusterActions.destroy({cluster});
    },

    LaunchClusterModal: function() {
        modals.ClusterModals.launch(this.state.sizes);
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    renderClusterRow: function(cluster) {
        let { td } = this.style();
        var style = {
            textTransform: "capitalize"
        };
        var lightStatus;
        if (cluster.get("clusterStatus") === "Active") {
            lightStatus = "active";
        } else {
            lightStatus = "transition";
        }
        return (
            <tr key={cluster.get("id")}>
                <td style={td}>
                    {cluster.get("clusterName")}
                </td>
                <td style={td}>
                     <span><div><StatusLight status={lightStatus}/><span style={style}>
                    {cluster.get("clusterStatus")}
                    </span></div><StatusBar status={cluster.get("clusterStatus")} /></span>
                </td>
                <td style={td}>
                    {cluster.get("pluginName")}
                </td>
                <td style={td}>
                    {cluster.get("clusterMasterIP")}
                </td>
                <td style={td}>
                    <a onClick={this.destroyCluster.bind(this, cluster)}><i style={{ color: "black" }} className="glyphicon glyphicon-trash" /></a>
                </td>
            </tr>
        );
    },


    render: function() {
        var clusters = this.state.clusters,
            plugins = this.state.plugins;

        let resourcesLoaded =
        [  clusters
             , plugins
             ].every(obj => obj);

        if (!resourcesLoaded) {
            return <div className="loading"></div>
        }

        return (
            <div className="container">
                <h1 className="t-display-1">Clusters</h1>
                <div className="container">
                    <div className="pull-left">
                        <RaisedButton
                            primary
                            onTouchTap={this.LaunchClusterModal}
                            label="Launch Cluster"
                        />
                    </div>
                </div>
                <div>
                    <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                        <thead>
                        <tr>
                            <th style={{ width: "25px"}}>Cluster Name</th>
                            <th style={{ width: "15px"}}>Status</th>
                            <th style={{ width: "15px"}}>Plugin Name</th>
                            <th style={{ width: "15px"}}>Master IP</th>
                            <th style={{ width: "15px"}}>Delete</th>
                            <th style={{ width: "15px"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {clusters ? clusters.map(this.renderClusterRow) : []}
                        </tbody>
                    </table>
                </div>
                <div>
                     <a href="https://kaizen.massopen.cloud/dashboard/project/data_processing/jobs/" target="_blank"><img src={horizon} style={{float:"right"}} /></a>
                </div>
            </div>
        );
    }
});

