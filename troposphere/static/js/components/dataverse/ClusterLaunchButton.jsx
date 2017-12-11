import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import modals from "modals";

export default React.createClass({
    displayName: "ClusterLaunchButton",

    propTypes: {
    },

    componentDidMount: function() {
        this.generateTooltip();
    },

    componentDidUpdate: function() {
        this.generateTooltip();
    },

    generateTooltip: function() {
        var el = ReactDOM.findDOMNode(this);
        var $el = $(el);
        $el.tooltip({
            title: "Launch a default cluster"
        });
    },

    hideTooltip: function() {
        $(ReactDOM.findDOMNode(this)).tooltip("hide");
    },

    handleClick: function() {
        modals.ClusterModals.clusterLaunch();
        // Fixes a bug in FireFox where the tooltip doesn't go away when button is clicked
        this.hideTooltip();
    },

    render: function() {
        var className = "glyphicon glyphicon-plus-sign";
        return (
            <button className="btn btn-default" onClick={this.handleClick}>
                Launch&nbsp;&nbsp;
                <i className={className} />
            </button>
        );
    }
});
