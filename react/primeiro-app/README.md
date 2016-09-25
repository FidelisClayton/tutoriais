# Desenvolvendo primeiro APP com React

## 1 - Configurando o projeto

### 1.1 Estrutura de pastas
```
├── bin
│   └── app.bundle.js
├── index.js
├── package.json
├── src
│   ├── components
│   │   └── App.js
│   └── main.js
└── webpack.config.js
```

### 1.2 Dependências
* Dependências de desenvolvimento
    * [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core)
    * [babel-loader](https://github.com/babel/babel-loader)
    * [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)
    * [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react)
    * [webpack](https://github.com/webpack/webpack)
* Dependências do projeto
    * [react](https://github.com/facebook/react)
    * [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom)

* Instalando dependências
    * Primeiramente vamos iniciar nosso arquivo **package.json**
    ```
    npm init -y
    ```
    * Em seguida as dependencias do projeto:
    ```
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack
    npm install --save react react-dom
    ```
    * Nosso arquivo **package.json** ficará assim:
    ```json
    {
      "name": "react-todo",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "babel-core": "^6.14.0",
        "babel-loader": "^6.2.5",
        "babel-preset-es2015": "^6.14.0",
        "babel-preset-react": "^6.11.1",
        "webpack": "^1.13.2"
      },
      "dependencies": {
        "react": "^15.3.1",
        "react-dom": "^15.3.1"
      }
    }
    ```    

### 1.2 - Configurando o webpack

* Configurando o arquivo **webpack.config.js**
```javascript
    var webpack = require('webpack');

    module.exports = {
        entry: './src/main.js', // Arquivo principal da aplicação
        output: {
            path: './dist/', // Pasta onde ficará o pacote gerado pelo webpack
            filename: 'app.bundle.js' // Nome do pacote gerado pelo webpack
            publicPath: './dist/'
        },
        module: {
            loaders: [
                {
                    test: /.jsx?$/, // Verifica se o arquivo possui a extensão .jsx
                    loader: 'babel-loader', // Loader responsável por converter JS ES6 para ES5
                    exclude: /node_modules/, // Evita que o webpack leia os arquivos da pasta node_modules
                    query: {
                        presets: ['es2015', 'react'] // Informa ao babel que vamos utilizar a sintaxe do ES6 e do React
                    }
                }
            ]
        }
    };
```

## 2 - Criando nossos Components
### 2.1 - O que são Components?
Components são pequenos "pedaços" da nossa aplicação que podem ser utilizados várias e várias vezes dentro dela (ou até mesmo fora).
<Bota uma imagem mostrando a componentização de uma tela>
    
### 2.2 - Mão na massa!
Primeiro vamos criar o arquivo **index.html**, nele adicionaremos a **div#app** que é onde nossa aplicação será renderizada e por último importamos o script
**app.bundle.js** gerado pelo **webpack**.

```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Playlist</title>
    </head>
    <body>
        <div id="app"></div>

        <script src="app.bundle.js"></script>
    </body>
    </html>
```

Agora vamos criar o arquivo **main.js** na pasta **src** que será responsável por renderizar a aplicação na div que adicionamos no html.
```javascript
    // src/main.js
    import React from 'react';
    import { render } from 'react-dom';

    render(
        <h1> Hello World! </h1>, 
        document.getElementById("app")
    );
```

Em seguida executamos o webpack para que ele possa gerar nosso **bundle**:
```
$: webpack --watch --progress -d
Hash: 3d368ac1323d81d802ed
Version: webpack 1.13.2
Time: 4607ms
            Asset    Size  Chunks             Chunk Names
    app.bundle.js  785 kB       0  [emitted]  main
app.bundle.js.map  864 kB       0  [emitted]  main
    + 172 hidden modules


```

Agora é só abrir o arquivo *index.html* no browser. Et voilá!

[Imagem do hello World]

### 2.3 - Title Component

Legal, mas ainda não criei nenhum Component, e agora? Vamos lá!
Nosso componente HelloWorld vai herdar a classe **Component** do **React** e em seguida
definimos o método **render** retornando o que queremos que o **Component** renderize.

```javascript
// src/components/Title.js

import React, { Component } from 'react'; // Importamos o React e o Component

// Agora é só extender a classe Component para nosso Title
export default class Title extends Component {
    render() {
        return (
            <h1>Title</h1>
        );
    }
}
```
Component criado agora é só importá-lo no nosso **main.js** e utilizá-lo.

```javascript
    // src/main.js
    import React from 'react';
    import { render } from 'react-dom';

    import Title from './components/Title';

    render(
        <Title />, 
        document.getElementById("app")
    );
```

Novamente rodamos o comando **webpack** no console e atualizarmos a página.

### 2.4 - App e Playlist
Agora vamos criar dois novos Components, o App.js que vai englobar todas as partes da nossa aplicação
e o Playlist.js onde ficará a lista de músicas.

```javascript
// src/components/Playlist.js

import React, { Component } from 'react';

export default class Playlist extends Component {
    render() {
        return(
            <ul class="collection with-header">
                <li> Música </li>
            </ul>
        );
    }

}
```

No Component **App** vamos importar os dois Components que haviamos criado:

```javascript
// src/components/App.js

import React, { Component } from 'react';

import Title from './Title';
import Playlist from './Playlist';

export default class App extends Component {
    render() {
        return(
            <Title />
            <Playlist />
        );
    }
}
```

Em seguida vamos importar o **App.js** no nosso arquivo **Main.js**:

```javascript
// src/main.js

// imports

import App from './components/App';

render(
    <App />,
    document.getElementById("app")
);
```

Agora vamos rodar o webpack e verificar o que acontece.

Oops, o Webpack nos retornou o seguinte erro:
```
ERROR in ./src/components/App.js
Module build failed: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (56:16)

```

O erro ocorreu porquê só podemos retornar um elemento JSX no método **render** do nosos component,então
basta "**encapsular**" nossos components em um único elemento JSX:

```javascript
// src/components/App.js

render() {
    return(
        <div class="container">
            <Title />
            <Playlist />
        </div>
    );
}
```

Agora bastar rodar o webpack e ver nossa aplicação funcionando. Hmm... Parece que tá tudo ok, mas vamos dar uma
olhada no console do navegador.

Temos a seguinte mensagem:

```
Warning: Unknown DOM property class. Did you mean className?
    in div (created by App)
    in App
```

Isso acontece porquê utilizamos a palavra reservada "class" nos nossos elementos JSX, para resolver isso basta
substituir "class" por "className":

```javascript
// src/components/App.js

// código anterior...

return(
    <div className="container">
    // código sem alterações ...
)
```


```
// src/components/Playlist.js

// código anterior...

return(
    <ul className="collection with-header">
    // código sem alterações ...
)
```

Se rodarmos a aplicação agora estará tudo ok.

### 2.5 - PlaylistItem, Props e Iterando Component
Agora vamos criar o Component para exibir nossas músicas:

```javascript
// src/components/PlaylistItem.js

import React, { Component } from 'react';

export default class PlaylistItem extends Component {
    render() {
        return(
            <li className="collection-item avatar">
                <span className="title">Titulo</span>
                <p>Artista - Album </p>
            </li>
        );
    }
}
```

E em seguida vamos utilizá-lo no componente Playlist:

```javascript
// src/components/Playlist.js

import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class Playlist extends Component {
    render() {
        return (
            <ul className="collection with-header">
                <PlaylistItem />
            </ul>
        );
    }
}
```
Agora só precisamos passar as informações para o nosso componente, para isso utilizaremos
os **props**, explicando de maneira suscinta, **props** são basicamente as propriedades
do nosso componente. Então sem mais delongas, vamos adicionar propriedades ao nosso componente:

```javascript
// src/components/Playlist.js

import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class Playlist extends Component {
    render() {
        return (
            <ul className="collection with-header">
                // Passando valores através de props
                <PlaylistItem 
                    title={"Lose yourself"} 
                    author={"Eminem"}
                    album={"Curtain Call"} />
            </ul>
        );
    }
}
```

Em seguida vamos exibir nosso componente PlaylistItem no console:

```javascript
export default class PlaylistItem extends Component {
    render() {
        console.log(this); // linha adicionada

        return(
            <li className="collection-item avatar">
                <span className="title">Titulo</span>
                <p>Artista - Album </p>
            </li>
        );
    }
}
```

No console do navegador poderemos ver tudo o que se refere ao componente
PlaylistItem, também podemos perceber a presença do objeto **props** e se
expandirmos ele poderemos ver que todos os dados que passamos estão disponíveis
para serem acessados pelo componente Então vamos exibir esses dados:

```javascript
// src/components/PlaylistItem.js

import React, { Component } from 'react';

export default class PlaylistItem extends Component {
    render() {
        return(
            <li className="collection-item avatar">
                <span className="title">{ this.props.title }</span>
                <p>{ this.props.author } - { this.props.album } </p>
            </li>
        );
    }
}
```

E teremos o seguinte resultado:
[imagem-resultado-props]

Agora como faremos para exibir várias músicas na nossa playlist? Simples, basta repetir
componentes!! Não parece uma má ideia né?

```javascript
// src/components/Playliste.js

render() {
    return (
        <ul className="collection with-header">
            // Só repetir... Tão fácil.
            <PlaylistItem title={"Lose yourself"} author={"Eminem"} album={"Curtain Call"} />
            <PlaylistItem title={"When i'm gone"} author={"Eminem"} album={"Curtain Call"} />
            <PlaylistItem title={"Rap god"} author={"Eminem"} album={"The Marshall Mathers LP2"} />
        </ul>
    );
```

Funciona? Funciona. É inteligente? Não.

Agora vamos fazer da maneira correta, primeiramente vamos editar o componente App e adicionar uma lista
de músicas que serão exibidas:

```javascript
// src/components/App.js

// imports omitidos

export default class App extends Component {
    constructor() {
        super();

        this.state = {
             // lista de músicas
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

    render() {
        return(
            <div className="container">
                <Title />
                // Vamos tornar a lista acessível para o componente Playlist
                <Playlist songs={this.state.songs}/>
            </div>
        );
    }
}
```

À primeira vista o **state** parece um simples objeto, mas preste muita atenção nele pois é ele que faz toda
a mágica acontecer. Como o próprio nome sugere, o **state** representa todo o estado do componente, caso algo seja
alterado, o componente será renderizado novamente. Veremos isso mais adiante, por ora, vamos apenas exibir os dados
que passamos para o componente Playlist:

```javascript
// src/component/Playlist.js

// imports omitidos

export default class Playlist extends Component {
    // função para iterar os objetos do array e tranformá-los em um componente
    createPlaylistItems() {
        return this.props.songs.map((song, i) => 
                <PlaylistItem title={song.title}
                              author={song.author}
                              album={song.album}
                              image={song.image}
                              id={i}
                              key={i}
                />
        );
    }

    render() {
        return (
            <ul className="collection with-header">
                // Chamamos a função para gerar os componentes na playlist
                { this.createPlaylistItems() }
            </ul>
        );
    }
}
```

Com isso feito, ao visualizar nossa aplicação veremos todos os itens renderizados.

**_E esse id e key que mandamos como prop_**?
Todo componente quando iterado necessita de uma chave única, no caso, o índice correspondente na lista de músicas. O id será utilizado
mais adiante para remover um item da lista.

**_E porquê não utilizamos a key para remover o item?_**
Pelo simples fato de que quando tentamos pegar o valor da key dentro do componente, será retornado
o valor *undefined*.

## 3 - Estilizando nosso Component

**Legal, mas tá feio...** Vamos lá!

### 3.1 - Inline Styles
A primeira forma de aplicar estilos que veremos é o **Inline Styles**, onde definimos um objeto
javascript com os atributos de estilos, em seguida passamos a váriavel de estilos para o Virtual DOM.

```javascript
export default class HelloWorld extends Component {
    render() {
        let styles = {
            color: '#98d8b0',
            fontSize: '65px',
            fontWeight: 'normal',
            lineHeight: '60px',
            margin: '10px 0 20px',
            textTransform: 'uppercase',
            textAlign: 'center',
            width: '450px',
            margin: '0 auto'
        };

        return (
            <h1 style={ styles }>Hello World Component!!</h1>
        );
    }
}
```
Continua feio, mas deu pra entender como funciona.

### 3.2 - Bom e velho CSS
Para esse exemplo vamos importar o CSS do bootstrap, para isso precisaremos baixar o bootstrap e mais algumns loaders para o webpack.

[TODO]

## 4 - Props, States e Refs

[TODO]

## 5 - Instalando um servidor de desenvolvimento
### 5.1 - Dependências
* Dependencias globais
    * [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

* Instalando o **webpack-dev-server**
```
> npm install webpack-dev-server -g
```

### 5.2 - Iniciando o servidor
Já instalamos o servidor, agora só precisamos inicializá-lo. Basta executar o comando *webpack-dev-server*
no terminal.
```
> webpack-dev-server
```

Em seguida basta acessar o endereço *http://localhost:8080* no navegador para visualizar a aplicação.

Agora vamos habilitar o **livereloading** no **webpack-dev-server** adicionando o seguinte trecho no final
do arquivos **webpack.config.js**.

```javascript
     plugins: [
        new webpack.HotModuleReplacementPlugin()
     ],
     devServer: {
        hot: true, // Ativa o HotModuleReplacement
        inline: true // Inicia o server no modo inline
     }
```
Em seguida iniciamos o **webpack-dev-server** novamente e acessamos o endereço *http://localhost:8080*, agora
a página irá atualizar sempre que fizermos algumas alteração no código da nossa aplicação.
