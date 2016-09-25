import React, { Component } from 'react';

import Title from './Title';
import Playlist from './Playlist';
import Form from './Form';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            songs: [
                {
                    title: "Rap god",
                    author: "Eminem",
                    album: "The Marshall Mathers LP2",
                    image: "https://upload.wikimedia.org/wikipedia/en/8/87/The_Marshall_Mathers_LP_2.png"
                },
                {
                    title: "When i'm gone",
                    author: "Eminem",
                    album: "Curtain Call",
                    image: "https://upload.wikimedia.org/wikipedia/en/4/4e/Curtain_Call_cover.jpg"
                },
                {
                    title: "Lose yourself",
                    author: "Eminem",
                    album: "Curtain Call",
                    image: "https://upload.wikimedia.org/wikipedia/en/4/4e/Curtain_Call_cover.jpg"
                }
            ]
        };

    }

    removeSong(index) {
        let songs = this.state.songs;
        songs.splice(index, 1);

        this.setState({
            songs
        });
    }

    addSong(song) {
        let songs = this.state.songs;
        songs.push(song);

        this.setState({
            songs
        });
    }

    render() {
        return (
            <div class="container">
                <Title />
                <Playlist
                    songs={this.state.songs}
                    removeSong={this.removeSong.bind(this)}
                />
                <Form
                    addSong={this.addSong.bind(this)}
                />
            </div>
        );
    }
}
