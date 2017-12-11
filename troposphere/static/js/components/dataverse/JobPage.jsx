import React from "react";
import stores from "stores";

import actions from "actions";
import JobLaunchButton from "./JobLaunchButton";
import ClusterLaunchButton from "./ClusterLaunchButton";

export default React.createClass({
    displayName: "JobPage",

    getInitialState: function() {
        return {
            jobs: stores.JobStore.getAll(),
            clusters: stores.ClusterStore.getAll(),
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.JobStore.addChangeListener(this.updateState);
        stores.ClusterStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.JobStore.removeChangeListener(this.updateState);
        stores.ClusterStore.removeChangeListener(this.updateState);
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    destroyCluster: function(cluster) {
        actions.ClusterActions.clusterDestroy({cluster});
    },

    renderJobRow: function(job) {
        let { td } = this.style();
        return (
            <tr key={job.get("jobID")}>
                <td style={td}>
                    {job.get("jobID")}
                </td>
                <td style={td}>
                    {job.get("clusterName")}
                </td>
                <td style={td}>
                    {job.get("jobStatus")}
                </td>
            </tr>
        );
    },

    renderClusterRow: function(cluster) {
        let { td } = this.style();
        return (
            <tr key={cluster.get("id")}>
                <td style={td}>
                    {cluster.get("clusterName")}
                </td>
                <td style={td}>
                    {cluster.get("pluginName")}
                </td>
                <td style={td}>
                    {cluster.get("clusterStatus")}
                </td>
                <td>
                    <a onClick={this.destroyCluster.bind(this, cluster)}><i style={{ color: "black" }} className="glyphicon glyphicon-trash" /></a>
                </td>
            </tr>
        );
    },

    render: function() {
        var jobs = this.state.jobs;
        var clusters = this.state.clusters;
        var locationSearch = window.location.search;
        var containerName = locationSearch.toString().split("=")[1];


        return (
            <div className="container">
                <h1 className="t-display-1">Jobs</h1>
                <div>
                    <h2 className="t-title">Run a job</h2>
                    <div>
                        { containerName ? <p>{"You have selected the dataset stored in container "} <strong>{containerName}</strong>{" ."}</p> : <p></p>}
                    </div>
                    <JobLaunchButton />
                </div>
                <div>
                    <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                        <thead>
                        <tr>
                            <th style={{ width: "30px"}}>Job Name</th>
                            <th style={{ width: "30px"}}>Cluster Name</th>
                            <th style={{ width: "30px"}}>Status</th>
                            <th style={{ width: "30px"}}></th>

                        </tr>
                        </thead>
                        <tbody>
                        {jobs ? jobs.map(this.renderJobRow) : [] }
                        </tbody>
                    </table>
                </div>
                <br />
                <hr />
                <div>
                    <h3 className="t-subtitle">Launch a cluster</h3>
                    <ClusterLaunchButton />
                </div>
                <div>
                    <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                        <thead>
                        <tr>
                            <th style={{ width: "30px"}}>Cluster Name</th>
                            <th style={{ width: "30px"}}>Plugin Name</th>
                            <th style={{ width: "30px"}}>Status</th>
                            <th style={{ width: "30px"}}>Delete</th>
                            <th style={{ width: "30px"}}></th>

                        </tr>
                        </thead>
                        <tbody>
                        {clusters ? clusters.map(this.renderClusterRow) : []}
                        </tbody>
                    </table>
                </div>
                <div>
                    <a href="https://engage1.massopencloud.org/dashboard/project/data_processing/jobs/" target="_blank"><img src="https://info.massopencloud.org/wp-content/uploads/2016/01/OpenStack_Project_Horizon_horizontal.jpg" style={{float:"right"}} /></a>
                </div>
            </div>
        );
    }
});
