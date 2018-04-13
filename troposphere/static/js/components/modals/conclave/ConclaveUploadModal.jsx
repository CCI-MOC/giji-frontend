import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import ConclaveUploadView from "components/common/ConclaveUploadView";


export default React.createClass({
    displayName: "ConclaveUploadModal",

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
                            <h1 className="t-title">Upload Script</h1>
                        </div>
                        <div className="modal-body">
                            <ConclaveUploadView cancel={this.cancel} onConfirm={this.confirm} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
