import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import modals from "modals";

export default React.createClass({
    displayName: "JobLaunchButton",

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
            title: "Launch a default job"
        });
    },

    hideTooltip: function() {
        $(ReactDOM.findDOMNode(this)).tooltip("hide");
    },

    handleClick: function() {
        modals.JobModals.jobLaunch();
        // Fixes a bug in FireFox where the tooltip doesn't go away when button is clicked
        this.hideTooltip();
    },

    render: function() {
        var className = "glyphicon glyphicon-plus-sign";
        return (
            <button className="btn btn-default" onClick={this.handleClick}>
                Run&nbsp;&nbsp;
                <i className={className} />
            </button>
        );
    }
});
