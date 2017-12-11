import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import stores from "stores";


export default React.createClass({
    displayName: "JobLaunchModal",

    mixins: [BootstrapModalMixin],

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        return {
            identity: identities ? identities.first().id : null,
            clusterName: "",
            typeName: "",
            jobName: "",
            inputPath: "",
            outputPath: "",
            jobstatus:""
        };
    },

    getState: function() {
        var identities = stores.IdentityStore.getAll(),
            identityId = null;

        if (identities) {
            identityId = this.state.identity ? this.state.identity : identities.first().id;
        }

        return {
            identity: identityId
        }
    },

    updateState: function() {
        if (this.isMounted()) this.setState(this.getState());
    },

    componentDidMount: function() {
        stores.IdentityStore.addChangeListener(this.updateState);
        stores.JobStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.IdentityStore.removeChangeListener(this.updateState);
        stores.JobStore.removeChangeListener(this.getInitialState);
    },

    isSubmittable: function() {
        var hastypeName = !!this.state.typeName;
        var hasjobName = !!this.state.jobName;
        return hastypeName && hasjobName;
    },

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm(this.state.identity, this.state.clusterName, this.state.typeName, this.state.jobName, this.state.inputPath, this.state.outputPath, this.state.jobStatus);
    },

    //
    // Custom Modal Callbacks
    // ----------------------
    //

    // todo: I don't think there's a clusterName to update state unless
    // there's a risk of the component being re-rendered by the parent.
    // Should probably verify this behavior, but for now, we play it safe.

    handleclusterNameChange: function(e) {
        this.setState({
            clusterName: e.target.value
        });
    },

    handletypeNameChange: function(e) {
        this.setState({
            typeName: e.target.value
        });
    },

    handlejobNameChange: function(e) {
        this.setState({
            jobName: e.target.value
        });
    },

    handleinputChange: function(e) {
        this.setState({
            inputPath: e.target.value
        });
    },

    handleoutputChange: function(e) {
        this.setState({
            outputPath: e.target.value
        });
    },

    //
    // Render
    // ------
    //

    renderClusterName: function(cluster) {
        return (
            <option>{cluster.get("clusterName")}
            </option>
        )
    },

    renderBody: function() {
        var clusters = stores.ClusterStore.getAll();
        var identities = stores.IdentityStore.getAll(),
            username = stores.ProfileStore.get().get("username"),
            jobs = stores.JobStore.findJobsWhere({
                "created_by.username": username
            });
        var locationSearch = window.location.search;
        var containerName = locationSearch.toString().split('=')[1];
        if (username == null || jobs == null) {
            return <div className="loading"></div>;
        }

        if (!identities) return <div className="loading" />;

        return (
            <div role="form">
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Cluster"}
                    </label>

                    <select className="form-control"
                            value={this.state.clusterName}
                            onChange={this.handleclusterNameChange}>
                        {clusters ? clusters.map(this.renderClusterName): <option>{"loading"}</option>}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Job Type"}
                    </label>

                    <select className="form-control"
                            value={this.state.typeName}
                            onChange={this.handletypeNameChange}>
                        <option>{"not selected"}</option>
                        <option>{"Spark"}</option>
                        <option>{"MapReduce"}</option>
                        <option>{"Pig"}</option>
                        <option>{"Shell"}</option>
                        <option>{"Storm"}</option>
                        <option>{"Hive"}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Job Template"}
                    </label>

                    <select className="form-control"
                            value={this.state.jobName}
                            onChange={this.handlejobNameChange}>
                        <option>{"not selected"}</option>
                        <option>{"Spark WordCount"}</option>
                        <option>{"Spark WordMedian"}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Input path"}
                    </label><br />
                    {containerName ? "swift://"+containerName+"/" : "swift://" }
                    <input type="text"
                           className="form-control"
                           value={this.state.inputPath}
                           onChange={this.handleinputChange}
                           placeholder={containerName ? "*.txt" : "container/*.txt"} />
                </div>
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Output path"}
                    </label><br />
                    {"swift://"}
                    <input type="text"
                           className="form-control"
                           value={this.state.outputPath}
                           onChange={this.handleoutputChange}
                           placeholder={"container/output"} />
                </div>
            </div>
        );
    },

    render: function() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <h1 className="t-title">Run a Job</h1>
                        </div>
                        <div className="modal-body">
                            {this.renderBody()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.cancel}>
                                Cancel
                            </button>
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.confirm}
                                    disabled={!this.isSubmittable()}>
                                Launch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
