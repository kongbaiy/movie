import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => (
    <div>
        <p className="hint_404">404</p>
        <br/>
        {props.msg}

        <style jsx={true}>{`
            .hint_404 {
                font-size: 32px;
            }
        `}</style>
    </div>
)

NotFound.propTypes = {
   msg: PropTypes.string
}

NotFound.defaultProps = {
   msg: ''
}

export default NotFound