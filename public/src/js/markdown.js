import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import MDReactComponent from 'markdown-react-js';
import "../sass/markdown.scss";


class Edit extends Component{
    constructor(){
        super();
        this.state = {
            input:''
        }
    }
    render(){
        return(
            <div className="content">
                <textarea onChange={(e)=>{
                    this.setState({
                        input:e.target.value
                    })
                }}/>
                <ReactMarkdown source={this.state.input} className="result"/>
            </div>
        )

    }
}
ReactDOM.render(
    <Edit />,
    document.getElementById('root')
)