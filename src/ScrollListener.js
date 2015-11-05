import React from 'react';
import Handler from './handler';
import shallowEqual from './utils/shallowEqual';
import isUndefined from 'lodash/lang/isUndefined';

function defaultExecute(oldProps, newProps) {
  return newProps;
}

export default function Listen(collect, execute = defaultExecute) {

  return function decorate(DecoratedComponent) {
    return class ScrollListener extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {};
        this._removeListener = Handler.registerScrollListener(this.context.scrollId, (scrollTop, bounding) => ({
          collect: collect(scrollTop, bounding, this.props, this.component),
          update: (props) => {
            var newProps = execute(this.state, props, this.component);
            if (isUndefined(newProps) || shallowEqual(this.state, newProps)) return;
            this.setState(newProps)
          }.bind(this)
        }))
      }

      componentWillUnmount() {
        this._removeListener.remove();
      }

      static contextTypes = {
        scrollId: React.PropTypes.string
      }

      render() {
        return (
          <DecoratedComponent 
            ref={(component) => this.component = component}
            {...this.props}
            {...this.state}
          />
        );
      }
    };
  }

    
}