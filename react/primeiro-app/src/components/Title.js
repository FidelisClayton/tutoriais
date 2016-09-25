import React, { Component } from 'react';

export default class Title extends Component {
    render() {
        let styles = {
            color: "#26a69a",
            textAlign: "center"
        };

        return (
            <h1 style={styles}>My Playlist</h1>
        );
    }
}
