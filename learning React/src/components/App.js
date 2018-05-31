import React from 'react';
import {render} from 'react-dom'
import ArticleList from './ArticleList'
import articles from '../fixtures'
import 'bootstrap/dist/css/bootstrap.css'

function App () {
    return <div className='container'>
        <div className='jumbotron'>
            <h1 className='display-3'>AppName</h1>
        </div>
        <ArticleList articles={articles}/>
    </div>
}

export default App