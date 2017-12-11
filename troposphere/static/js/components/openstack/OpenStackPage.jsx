import React from "react";

import CallToAction from "./CallToAction";

// images
import openstack from "themeImages/openstack.png";

export default React.createClass({
    displayName: "OpenStackPage",

    render: function() {
        return (
            <div id="dashboard-view">
              <div style={{ paddingTop: "30px" }} className="container">
                <h2 className="t-headline">MOC OpenStack</h2>
                <div className="row calls-to-action">
                  <div className="col-md-6">
                    <CallToAction title="Launch an instance"
                                  image={openstack}
                                  description="Choose an image and launch an instance with a custom flavor"
                                  linksTo="images" />
                  </div>
                  <div className="col-md-6">
                    <CallToAction title="View Project & Instances"
                                  image={openstack}
                                  description="View your default OpenStack projects or view existing instances"
                                  linksTo="projects" />
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

