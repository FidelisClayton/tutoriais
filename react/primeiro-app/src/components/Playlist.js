import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class Playlist extends Component {
    createPlaylist() {
        return this.props.songs.map((song, i) =>
            <PlaylistItem
                title={song.title}
                author={song.author}
                image={song.image}
                album={song.album}
                key={i}
                id={i}
                removeSong={this.props.removeSong}
            />
        );
    }

    render() {
        if(this.props.songs.length > 0)
            return (
                <ul className="collection with-header">

                    { this.createPlaylist() }

                </ul>
            );
        else
            return (
                <h4> Adicione músicas na playlist </h4>
            );
    }
}
