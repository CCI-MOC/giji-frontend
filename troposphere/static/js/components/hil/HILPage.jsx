import React from "react";


export default React.createClass({
    displayName: "HILPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">Hardware Isolation Layer</h1>
            <div>
                <p>
                    {"Comming soon! For now, please go to"}<a href={"https://massopen.cloud/blog/project-hil"} target="_blank"> {"MOC webside"}</a> {"and"} <a href={"https://github.com/CCI-MOC/hil"} target="_blank"> {"Github"}</a> {"for more details"}
                </p>
            </div>
        </div>
        );
    }
});
