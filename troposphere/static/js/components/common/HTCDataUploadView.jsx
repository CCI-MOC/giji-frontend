import React from "react";
import RaisedButton from "material-ui/RaisedButton";

export default React.createClass({
    displayName: "HTCDataUploadView",


    getInitialState: function() {
        return {
            file: []
        };
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        console.log("Confirm, this.state.file:", this.state.file);
        if (true) {
            this.props.onConfirm(this.state.identity,
                this.state.file);
        }
        this.setState({
            showValidation: true
        });
    },

    onFileChange: function(e) {
        console.log('Selected files:', e.target.files);
        console.log('Selected file:', e.target.files[0]);
        this.setState({
            file: e.target.files
        });
    },


    render: function() {
        return (
            <form encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="file-name">
                        Data File
                    </label>
                    <input name="file-name"
                           type="file"
                           className="form-control"
                           placeholder="Attachment"
                           onChange={this.onFileChange} />
                </div>
                <div className="modal-footer">
                    <RaisedButton
                        id="cancelDataFile"
                        style={{ marginRight: "10px" }}
                        onTouchTap={this.props.cancel}
                        label="Cancel"
                    />
                    <RaisedButton
                        primary
                        id="submitDataFile"
                        onTouchTap={this.confirm}
                        label="Upload"
                    />
                </div>
            </form>
        );
    }
});

