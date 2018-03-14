import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import modals from "modals";


export default React.createClass({
    displayName: "HTCPage",

    LaunchClusterModal: function() {
        modals.HTCModals.upload();
    },

    render: function() {
        return (
            <div className="container">
                <div style={{ paddingTop: "50px" }} className="project-name clearfix">
                    <div className="pull-left">
                        <h1 className="t-display-1">MOC High Throughput Computing Panel</h1>
                        <hr />
                        <br />
                        <div className="pull-left">
                            <RaisedButton
                                primary
                                onTouchTap={this.LaunchClusterModal}
                                label="Upload File"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

