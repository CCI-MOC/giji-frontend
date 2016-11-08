import React from 'react';
import Router from 'react-router';
import stores from 'stores';

import { Section } from 'cyverse-ui';

import Wrapper from 'components/common/ui/Wrapper.react';
import ResourcesHeader from '../common/ProjectResourcesHeader.react';

let RouteHandler = Router.RouteHandler;

export default React.createClass({
    displayName: "ProjectDetailsMaster",

    mixins: [Router.State],

    render: function() {
        var project = stores.ProjectStore.get(Number(this.getParams().projectId));

        if (!project) {
            return (
                <div className="loading"></div>
            )
        }

        return (
            <Section>
              <ResourcesHeader project = { project } />
              <RouteHandler project = { project } />
            </Section>
        );
    }
});
