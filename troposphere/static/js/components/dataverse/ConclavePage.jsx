import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import modals from "modals";
import stores from "stores";


export default React.createClass({
    displayName: "ConclavePage",

    getInitialState: function() {
        var files = stores.FileStore.getAll(),
            dataFiles = stores.DataSourceStore.fetchWhere({
                doi_id: Object.keys(this.props.location.query)
        });

        return {
            files: files,
            dataFiles: dataFiles,
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.FileStore.addChangeListener(this.updateState);
        stores.DataSourceStore.addChangeListener(this.updateState);

    },

    componentWillUnmount: function() {
        stores.FileStore.removeChangeListener(this.updateState);
        stores.DataSourceStore.removeChangeListener(this.updateState);
    },


    UploadModal: function() {
        modals.ConclaveModals.upload();
    },

    SubmitModal: function() {
        modals.ConclaveModals.submit(this.state.dataFiles);
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "pre"
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

    renderDataRow: function(data) {
        let { td } = this.style();

        return (
            <tr key={data.get("containerName")}>
                <td style={td}>
                    {data.get("containerName")}
                </td>
                <td style={td}>
                    {data.get("title")}
                </td>
                <td style={td}>
                    {data.get("files")}
                </td>
            </tr>
        );
    },


    render: function() {
        var files = this.state.files;
        var dataFiles = this.state.dataFiles;
        console.log(dataFiles);
        return (
            <div className="container">
                <h1 className="t-display-1">MPC</h1>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="t-title">Upload</h4>
                        <RaisedButton
                            primary
                            onTouchTap={this.UploadModal}
                            label="Upload"
                        />
                        <div className="pull-left">
                            <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                                <thead>
                                <tr>
                                    <th style={{ width: "40px"}}>Uploaded Scripts</th>
                                </tr>
                                </thead>
                                <tbody>
                                {files ? files.map(this.renderFileRow) : []}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4 className="t-title">Submit</h4>
                        <RaisedButton
                            primary
                            onTouchTap={this.SubmitModal}
                            label="Submit"
                        />
                        <br />
                        <div className="pull-left">
                            <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                                <thead>
                                <tr>
                                    <th style={{ width: "20px"}}>Swift Container Name</th>
                                    <th style={{ width: "20px"}}>Datasets Title</th>
                                    <th style={{ width: "25px"}}>Files</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataFiles ? dataFiles.map(this.renderDataRow) : []}
                                </tbody>
                            </table>
                        </div>
                   </div>
                </div>
            </div>
        );
    }
});
