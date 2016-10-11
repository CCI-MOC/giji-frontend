import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Backbone from "backbone";
import Router from "react-router";
import RouterInstance from "Router";


export default React.createClass({
    displayName: "Tag",

    mixins: [Router.State],

    propTypes: {
        tag: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        renderLinks: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            renderLinks: true
        }
    },

    onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        RouterInstance.getInstance()
            .transitionTo("search",null,{ 
                    q: this.props.tag.get('name')
            });
    },

    componentDidMount: function() {
        // FIXME:
        // https://github.com/yannickcr/eslint-plugin-react/issues/678#issue-165177220
        var el = ReactDOM.findDOMNode(this),
            $el = $(el),
            tag = this.props.tag;

        $el.tooltip({
            title: tag.get("description"),
            placement: "left"
        });
    },

    render: function() {
        var tag = this.props.tag,
            tagName = tag.get("name"),
            link;

        if (this.props.renderLinks) {
            link = (
                <span onClick={ this.onClick }> 
                    {tagName}
                </span>
            );
        } else {
            link = (
                <span>
                    {tagName}
                </span>
            )
        }

        return (
        <li className="tag">
            {link}
        </li>
        );

    }
});
