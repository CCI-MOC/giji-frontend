import React from "react";


export default React.createClass({
    displayName: "BMIPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">MOC Bare Metal Imaging</h1>
            <div>
                <p>
                    {"Comming soon! For now, please go to"}<a href={"https://massopen.cloud/blog/bare-metal-imaging"} target="_blank"> {"MOC webside"}</a> {"and"} <a href={"https://github.com/CCI-MOC/ims"} target="_blank"> {"Github"}</a> {"for more details"}
                </p>

            </div>
        </div>
        );
    }
});
