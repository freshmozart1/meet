// src/components/Alert.js

import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.backgroundColor = null;
    }

    /**
     * @function getStyle
     * @description Get the style for the alert
     * @returns {import('react').CSSProperties}
     */
    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.backgroundColor,
            borderWidth: '2px',
            fontWeight: 'bolder',
            borderRadius: '7px',
            borderColor: this.color,
            textAlign: 'center',
            fontSize: '12px',
            margin: '10px 0',
            padding: '10px',
            borderStyle: 'solid',
        }
    }
    render() {
        return (<div style={this.getStyle()}>{this.props.text}</div>);
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0, 0, 255)';
        this.backgroundColor = 'rgb(220, 220, 255)';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 0, 0)';
        this.backgroundColor = 'rgb(255, 160, 160)';
    }
}

export { InfoAlert, ErrorAlert };