import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";

export default React.createClass({
    displayName: "ServiceUnavailableModal",

    mixins: [BootstrapModalMixin],

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm();
    },

    renderBody: function() {
        return (
        <div role="form">
            <div className="form-group">
                <p>
                    {"GIJI is currently under maintenance. This message will " +
                     "automatically go away once maintenance is completed."}
                </p>
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
                        <h1 className="t-title">GIJI Maintenance</h1>
                    </div>
                    <div className="modal-body">
                        {this.renderBody()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.confirm}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
