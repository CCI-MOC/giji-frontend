import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import HTCUploadView from "components/common/HTCUploadView";


export default React.createClass({
    displayName: "HTCUploadModal",

    mixins: [BootstrapModalMixin],

    cancel: function() {
        this.hide();
    },

    confirm: function(identity, file) {
        this.hide();
        this.props.onConfirm(identity, file);
    },

    render: function() {

        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <h1 className="t-title">Upload File</h1>
                        </div>
                        <div className="modal-body">
                            <HTCUploadView cancel={this.cancel} onConfirm={this.confirm} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
