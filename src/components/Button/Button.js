// import { Component } from 'react';
import PropTypes from 'prop-types';

export default function Button({ loadMoreHandler }) {
  return (
    <button type="Button" className="Button" onClick={loadMoreHandler}>
      Load more
    </button>
  );
}

Button.propType = {
  loadMoreHandler: PropTypes.func.isRequired,
};

// class Button extends Component {
//   render() {
//     return (
//       <button
//         type="Button"
//         className="Button"
//         onClick={this.props.loadMoreHandler}
//       >
//         Load more
//       </button>
//     );
//   }
// }

// export default Button;
