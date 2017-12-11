import React from "react";
import stores from "stores";
import RaisedButton from "material-ui/RaisedButton";
import SelectMenu from "components/common/ui/SelectMenu";
import Backbone from "backbone";


export default React.createClass({
    displayName: "ClusterLaunchModal",

    propTypes: {
        sizes: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        var plugins = stores.SaharaPluginStore.getAll();

        return {
            identity: identities ? identities.first().id : null,
            clusterSize: this.props.sizes.first(),
            plugins: plugins,
            pluginName: plugins.first(),
            clusterName: "",
            workerNum: "1",
            clusterStatus: "Building"
        };
    },

    validateName: function () {
        let name = this.state.clusterName;
        let hasError = false;
        let message = "";
        let maxCharLen = 60;

        if (name === "") {
            hasError = true;
            message = "This field is required";
        }

        if (name.length > maxCharLen) {
            hasError = true;
            message = `Must be less than ${maxCharLen} characters long`;
        }

        return {
            hasError,
            message
        }
    },

    isSubmittable: function () {
        if (!this.validateName().hasError) {
            return true;
        }

        return false;
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        if (this.isSubmittable()) {
            this.props.onConfirm(this.state.identity, this.state.pluginName.get("name"), this.state.clusterName.trim(), this.state.clusterSize, this.state.workerNum, this.state.clusterStatus);
        }
        this.setState({
            showValidation: true
        });
    },


    onPluginNameChange: function(pluginName) {
        this.setState({
            pluginName: pluginName
        });
    },

    onClusterNameChange: function(e) {
        this.setState({
            clusterName: e.target.value
        });
    },

    onSizeNameChange: function(clusterSize) {
        this.setState({
            clusterSize: clusterSize
        });
    },

    onWorkerNumChange: function(e) {
        this.setState({
            workerNum: e.target.value
        });
    },

    //
    // Render
    // ------
    //

    renderBody: function() {
        let nameClassNames = "form-group";
        let nameErrorMessage = null;

        if (this.state.showValidation) {
            nameClassNames = this.validateName().hasError ?
                "form-group has-error" : null;
            nameErrorMessage = this.validateName().message;
        }

        return (
            <div role="form">
                <div className={nameClassNames}>
                    <label htmlFor="size-name">
                        Plugins
                    </label>
                    <SelectMenu id="cluster-plugin-name"
                                current={this.state.pluginName}
                                optionName={plugin => plugin.get("name")}
                                list={this.state.plugins}
                                onSelect={this.onPluginNameChange} />
                    <span className="help-block">{nameErrorMessage}</span>
                </div>
                <div className={nameClassNames}>
                    <label htmlFor="cluster-name">
                        Cluster Name
                    </label>
                    <input type="text"
                           name="cluster-name"
                           id="cluster-name"
                           className="form-control"
                           placeholder="giji-cluster"
                           value={this.state.clusterName}
                           onChange={this.onClusterNameChange} />
                    <span className="help-block">{nameErrorMessage}</span>
                </div>
                <div className={nameClassNames}>
                    <label htmlFor="size-name">
                        Sizes
                    </label>
                    <SelectMenu id="cluster-size"
                                current={this.state.clusterSize}
                                optionName={size => size.get("name")}
                                list={this.props.sizes}
                                onSelect={this.onSizeNameChange} />
                </div>
                <div className={nameClassNames}>
                    <label htmlFor="worker-number">
                        Worker Amount
                    </label>
                    <input type="text"
                           name="worker-number"
                           id="worker-number"
                           className="form-control"
                           placeholder="1"
                           value={this.state.workerNum}
                           onChange={this.onWorkerNumChange} />
                </div>
            </div>
        );
    },

    render: function() {
        let isSubmittable = true;
        if (this.state.showValidation) {
            if (!this.isSubmittable()) {
                isSubmittable = false
            }
        }
        return (
            <div>
                {this.renderBody()}
                <div className="modal-footer">
                    <RaisedButton
                        id="cancelLaunchCluster"
                        style={{ marginRight: "10px" }}
                        onTouchTap={this.props.cancel}
                        label="Cancel"
                    />
                    <RaisedButton
                        primary
                        id="submitLaunchCluster"
                        onTouchTap={this.confirm}
                        disabled={!isSubmittable}
                        label="Launch"
                    />
                </div>
            </div>
        );
    }
});

