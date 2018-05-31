import React, {Component} from 'react';
import {render} from 'react-dom'

class Article extends Component {
	state = {
		isOpen: true
	}
	render() {
	const {article} = this.props
	const body =this.state.isOpen && <section className='card-text'>{article.text}</section>
  	return (
      <div className="card mx-auto" style={{width:'50%'}}>
      	<div className="card-header">
	 		<h2>
	 		{article.title}
			<button className="btn btn-primary btn-lg float-right" onClick ={this.handleClick}>{this.state.isOpen ? 'close':'open'}</button>
	 		</h2>
	 	        </div>

	 		<div className="card-body">
		 		{body}
		 	</div>
		        <h6 className='card-subtitle text-muted'>
		        	Creation date: {(new Date(article.date)).toDateString()}
		        </h6>
    </div>
      )
	}
	handleClick = () => {
		this.setState({
			isOpen:!this.state.isOpen
		})
	}
}

function Article(props) {

}

function handleClick() {

}

export default Article