import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import ConclaveSubmitView from "components/common/ConclaveSubmitView";


export default React.createClass({
    displayName: "ConclaveSubmitModal",

    mixins: [BootstrapModalMixin],

    propTypes: {
        data: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    cancel: function() {
        this.hide();
    },

    confirm: function(identity, file, dataFiles) {
        this.hide();
        console.log(dataFiles);
        this.props.onConfirm(identity, file, dataFiles);
    },

    render: function() {
        console.log(this.props.data);
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <h1 className="t-title">Submit to Conclave</h1>
                        </div>
                        <div className="modal-body">
                            <ConclaveSubmitView data={this.props.data} cancel={this.cancel} onConfirm={this.confirm} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
