import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import './voices.scss'

export class VoicesPage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        
        return (
            <div>
            voices
                </div>
        );
    }
}

function mapStateToProps(state) {
    // const { users } = state;
    // return {
    //     user
    // };
}
