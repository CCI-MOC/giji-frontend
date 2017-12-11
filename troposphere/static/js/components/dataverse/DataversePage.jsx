import React from "react";

import SecondaryDataverseNavigation from "./common/SecondaryDataverseNavigation";


export default React.createClass({
    displayName: "DataverseMaster",

    render: function() {
        return (
            <div>
                <SecondaryDataverseNavigation currentRoute="todo-remove-this" />
                {this.props.children}
            </div>
        );
    }
})
