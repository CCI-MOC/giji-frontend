import React from "react";
import stores from "stores";
import RaisedButton from "material-ui/RaisedButton";
import SelectMenu from "components/common/ui/SelectMenu";


export default React.createClass({
    displayName: "ConclaveSubmitView",

    propTypes: {
        data: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        var files = stores.FileStore.getAll();

        return {
            identity: identities ? identities.first().id : null,
            files: files,
            file: files ? files.first() : null,
        };
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.props.onConfirm(this.state.identity, this.state.file, this.props.data);
        this.setState({
            showValidation: true
        });
    },


    onFileNameChange: function(file) {
        this.setState({
            file: file
        });
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "pre"
            }
        }
    },

    //
    // Render
    // ------
    //

    renderDataRow: function(data) {
        let { td } = this.style();

        return (
            <tr key={data.get("containerName")}>
                <td style={td}>
                    {data.get("title")}
                </td>
                <td style={td}>
                    {data.get("files")}
                </td>
            </tr>
        );
    },

    renderBody: function() {
        let nameClassNames = "form-group";
        var dataFiles = this.props.data;
        return (
            <div role="form">
                <div className={nameClassNames}>
                    <label htmlFor="job-name">
                        Job Script
                    </label>
                    <SelectMenu id="cluster-size"
                                current={this.state.file}
                                optionName={file => file.get("fileName")}
                                list={this.state.files}
                                onSelect={this.onFileNameChange} />
                </div>
                <div className={nameClassNames}>
                    <label htmlFor="data-name">
                        Data File
                    </label>
                    <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                        <thead>
                        <tr>
                            <th style={{ width: "15px"}}>Datasets Title</th>
                            <th style={{ width: "45px"}}>Files</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataFiles ? dataFiles.map(this.renderDataRow) : []}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },

    render: function() {

        return (
            <div>
                {this.renderBody()}
                <div className="modal-footer">
                    <RaisedButton
                        id="cancelsubmit"
                        style={{ marginRight: "10px" }}
                        onTouchTap={this.props.cancel}
                        label="Cancel"
                    />
                    <RaisedButton
                        primary
                        id="submitConclave"
                        onTouchTap={this.confirm}
                        label="Submit"
                    />
                </div>
            </div>
        );
    }
});
