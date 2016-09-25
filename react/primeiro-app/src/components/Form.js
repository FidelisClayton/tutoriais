import React, { Component } from 'react';

export default class Form extends Component {
    handleFormSubmit(e) {
        e.preventDefault();
        let song = {
            title: this.refs.title.value,
            author: this.refs.author.value,
            image: this.refs.image.value,
            album: this.refs.album.value
        };

        this.props.addSong(song);

        this.refs.title.value = null;
        this.refs.author.value = null;
        this.refs.image.value = null;
        this.refs.album.value = null;
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.handleFormSubmit.bind(this)}>

                    <div className="row">
                        <div className="input-field col s3">
                            <input placeholder="Nome da música" type="text" className="validate" ref="title" />
                        </div>

                        <div className="input-field col s3">
                            <input placeholder="Artista" type="text" className="validate" ref="author" />
                        </div>

                        <div className="input-field col s3">
                            <input placeholder="Album" type="text" className="validate" ref="album" />
                        </div>

                        <div className="input-field col s3">
                            <input placeholder="URL da imagem" type="text" className="validate" ref="image" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s2">
                            <button type="submit" className="btn btn-large">Adicionar</button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }
}
