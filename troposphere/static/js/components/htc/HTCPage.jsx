import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import modals from "modals";
import stores from "stores";


export default React.createClass({
    displayName: "HTCPage",

    getInitialState: function() {
        var files = stores.FileDirectoryStore.getAll();
        var data = stores.DataFileStore.getAll();
        var htc_jobs = stores.HTCStore.getAll();

        return {
            files: files,
            data: data,
            htc_jobs: htc_jobs
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.FileDirectoryStore.addChangeListener(this.updateState);
        stores.DataFileStore.addChangeListener(this.updateState);
        stores.HTCStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.FileDirectoryStore.removeChangeListener(this.updateState);
        stores.DataFileStore.removeChangeListener(this.updateState);
        stores.HTCStore.removeChangeListener(this.updateState);

    },


    UploadJobScriptModal: function() {
        modals.HTCModals.upload();
    },

    UploadDataFileModal: function() {
        modals.HTCModals.uploadData();
    },

    SubmitFileModal: function() {
        modals.HTCModals.submit();
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    renderFileRow: function(file) {
        let { td } = this.style();

        return (
            <tr key={file.get("fileName")}>
                <td style={td}>
                    {file.get("fileName")}
                </td>
            </tr>
        );
    },

    renderOutputRow: function(file) {
        let { td } = this.style();
        let path = "/".concat(file.get('fileName'));
        return (
            <tr key={file.get("fileName")}>
                <td style={td}>
                    <a href={path} download>
                        {file.get("fileName")}
                    </a>
                </td>
            </tr>
        );
    },



    render: function() {
        var files = this.state.files;
        var data = this.state.data;
        var htc_jobs = this.state.htc_jobs;

        return (
            <div style={{ paddingTop: "50px" }} className="container">
                <h1 className="t-display-2">MOC High Throughput Computing</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="t-title">Step One: Upload Batch Job Script</h4>
                        <RaisedButton
                            primary
                            onTouchTap={this.UploadJobScriptModal}
                            label="Upload Script"
                        />
                        <div className="pull-left">
                            <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                                <thead>
                                <tr>
                                    <th style={{ width: "100px"}}>Existed Job Scripts</th>
                                </tr>
                                </thead>
                                <tbody>
                                {files ? files.map(this.renderFileRow) : []}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4 className="t-title">Submit a Batch Job</h4>
                        <RaisedButton
                            primary
                            onTouchTap={this.SubmitFileModal}
                            label="Submit"
                        />
                        <div className="pull-left">
                            <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                                <thead>
                                <tr>
                                    <th style={{ width: "100px"}}>Output Files</th>
                                </tr>
                                </thead>
                                <tbody>
                                {htc_jobs ? htc_jobs.map(this.renderOutputRow) : []}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <h4 className="t-title">Step Two: Upload Data File (Optional)</h4>
                        <div className="pull-left">
                            <RaisedButton
                                primary
                                onTouchTap={this.UploadDataFileModal}
                                label="Upload Data"
                            />
                        </div>
                    </div>
                    <div>
                        <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                            <thead>
                            <tr>
                                <th style={{ width: "100px"}}>Existed Data Files</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data ? data.map(this.renderFileRow) : []}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

