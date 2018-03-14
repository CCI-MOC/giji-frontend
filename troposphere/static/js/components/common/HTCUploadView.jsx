import React from "react";
import RaisedButton from "material-ui/RaisedButton";

export default React.createClass({
    displayName: "HTCUploadView",


    getInitialState: function() {
        return {
            file: []
        };
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.props.onConfirm(this.state.identity,
            this.state.file);
        
        this.setState({
            showValidation: true
        });
    },

    onFileChange: function(e) {
        this.setState({
            file: e.target.files
        });
    },



    render: function() {
        return (
            <form encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="file-name">
                        File
                    </label>
                    <input name="file-name"
                           type="file"
                           className="form-control"
                           placeholder="Attachment"
                           onChange={this.onFileChange} />
                </div>
                <div className="modal-footer">
                <RaisedButton
                  id="cancelUpload"
                  style={{ marginRight: "10px" }}
                  onTouchTap={this.props.cancel}
                  label="Cancel"
                />
                <RaisedButton
                  primary
                  id="submitUpload"
                  onTouchTap={this.confirm}
                  label="Upload"
                />
                </div>
            </form>
        );
    }
});
