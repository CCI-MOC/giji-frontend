/** @jsx React.DOM */

define(
  [
    'react',
    'stores',
    './detail/details/ProjectDetailsView.react',
    'react-router'
  ],
  function (React, stores, ProjectDetailsView, Router) {

    return React.createClass({

      mixins: [Router.State],

      //
      // Mounting & State
      // ----------------
      //

      getState: function() {
        return {
          project: stores.ProjectStore.get(this.getParams().projectId)
        };
      },

      getInitialState: function() {
        return this.getState();
      },

      updateState: function() {
        if (this.isMounted()) this.setState(this.getState())
      },

      componentDidMount: function () {
        stores.ProjectStore.addChangeListener(this.updateState);
      },

      componentWillUnmount: function () {
        stores.ProjectStore.removeChangeListener(this.updateState);
      },

      //
      // Render
      // ------
      //

      render: function () {
        var project = this.state.project;

        if (project) {
          return (
            <ProjectDetailsView project={project}/>
          );
        }

        return (
          <div className="loading"></div>
        );
      }

    });

  });
