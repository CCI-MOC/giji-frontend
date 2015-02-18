/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'components/mixins/modal'
  ],
  function (React, Backbone, ModalMixin) {

    return React.createClass({

      propTypes: {
        machineId: React.PropTypes.string.isRequired,
        machines: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        onChange: React.PropTypes.func.isRequired
      },

      render: function () {
        var options = this.props.machines.map(function (machine) {
          return (
            <option key={machine.get('alias')} value={machine.get('alias')}>
              {machine.get('pretty_version')}
            </option>
          );
        });

        return (
          <select value={this.props.machineId} id='machine' className='form-control' onChange={this.props.onChange}>
            {options}
          </select>
        );
      }

    });

  });
