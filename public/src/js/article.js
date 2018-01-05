import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import '../sass/write.scss';

class Article extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            content:''
        }
    }
    componentDidMount(){
        let id = location.href.split('/').pop();
        fetch('/getArticle',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id}),
            mode: 'cors'
        }).then((res)=>res.json())
            .then((data)=>{
                let {articles} = data;
                this.setState({
                    title:articles[0].title,
                    content:articles[0].content
                })

            });
    }
    render(){
        return(
            <div className="article">
                <ReactMarkdown source={'# '+this.state.title+'\n'+this.state.content}/>
            </div>

        )
    }
}
ReactDOM.render(<Article/>,document.getElementById('root'));