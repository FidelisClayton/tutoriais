import React, { Component } from 'react';

export default class PlaylistItem extends Component {
    handleCloseButtonClick(e) {
        e.preventDefault();
        this.props.removeSong(this.props.id);
    }

    render() {
        let {image, title, author, album} = this.props;

        return (
            <li className="collection-item avatar">
                <img src={image} className="circle" />
                <span className="title"> {title} </span>
                <p>
                    {author} <br />
                    {album}
                </p>
                <a href=" " className="secondary-content" onClick={this.handleCloseButtonClick.bind(this)}>
                    <i className="material-icons">close</i>
                </a>
            </li>
        ); 
    }
}
