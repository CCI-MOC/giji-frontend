import React from "react";
import stores from "stores";
import RaisedButton from "material-ui/RaisedButton";
import SelectMenu from "components/common/ui/SelectMenu";


export default React.createClass({
    displayName: "SubmitHTCModal",


    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        var files = stores.FileDirectoryStore.getAll();
        var data_files = stores.DataFileStore.getAll();

        return {
            identity: identities ? identities.first().id : null,
            files: files,
            data_files: data_files,
            file: files ? files.first() : null,
            data: data_files ? data_files.first() : null
        };
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.props.onConfirm(this.state.identity, this.state.file, this.state.data);
        this.setState({
            showValidation: true
        });
    },


    onFileNameChange: function(file) {
        this.setState({
            file: file
        });
    },

    onDataNameChange: function(data) {
        this.setState({
            data: data
        });
    },


    //
    // Render
    // ------
    //

    renderBody: function() {
        let nameClassNames = "form-group";

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
                    <SelectMenu id="cluster-size"
                                current={this.state.data}
                                optionName={data => data.get("fileName")}
                                list={this.state.data_files}
                                onSelect={this.onDataNameChange} />
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
                        id="submitHTC"
                        onTouchTap={this.confirm}
                        label="Submit"
                    />
                </div>
            </div>
        );
    }
});

