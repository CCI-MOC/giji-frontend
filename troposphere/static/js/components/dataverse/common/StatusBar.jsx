import React from "react";

export default React.createClass({
    displayName: "ClusterStatusBar",

    propTypes: {
        status: React.PropTypes.string.isRequired
    },

    getPercentComplete: function() {
        var status = this.props.status;
        var percentComplete = 100;
        if (status) {
            percentComplete = this.get_percent_complete(status);
        }
        return percentComplete;
    },

    get_percent_complete: function(status) {
        var lookup,
            states = {
                // Number represents percent task *completed* when in this state
                "Building": 0,
                "Validating": 10,
                "InfraUpdating": 15,
                "Spawning": 30,
                "Waiting":50,
                "Preparing": 65,
                "Configuring": 75,
                "Starting": 85,
                "Active": 100,
                "error": {},
                "Deleting": 50
            };

        lookup = states[status];

        if (!lookup) {
            lookup = {};
            console.error("Unknown state (%s) representation passed", status);
        }

        // Note: 100 is graphically similar to 0
        return lookup || 100;
    },

    render: function() {
        var percentComplete = this.getPercentComplete();
        var style = {
            width: "0%"
        };

        style.width = percentComplete + "%";

        if (!percentComplete || percentComplete === 100) {
            return (
                null
            );
        }

        return (
            <div className="progress">
                <div className="progress-bar progress-bar-success progress-bar-striped active" style={style}>
                    {style.width}
                </div>
            </div>
        );
    }
});

