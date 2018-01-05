import { Row, Col,Icon} from 'antd';
import React,{Component} from 'react';
import ReactMarkdown from 'react-markdown';
import '../../sass/write.scss'
import Collections from './Collections';
import Articles from './Articles';


class Write extends Component{
    constructor(){
        super();
        this.state = {
            content:'',
            title:'',
            collections:[],
            articles:[],
            collectionIndex:0,
            articleIndex:0,
            userName:''
        }
        this.insertCollection = this.insertCollection.bind(this);
        this.insertArticles = this.insertArticles.bind(this);
        this.collectionChange = this.collectionChange.bind(this);
        this.articleChange = this.articleChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
    }
    collectionChange(e){
        let {key} = e;
        let articles = this.state.collections[key].articles;
        let title = articles[0]?articles[0].title:'';
        let content = articles[0]?articles[0].content:'';
        this.setState({
            articles:articles,
            title:title,
            content:content,
            collectionIndex:key
        })
    }
    articleChange(e){
        let {key} = e;
        console.log(key);
        this.setState({
            title:this.state.articles[key].title?this.state.articles[key].title:'',
            content:this.state.articles[key].content?this.state.articles[key].content:'',
            articleIndex:key
        })
    }
    insertCollection(input){
        let name = input.value;
        if(name.trim() === ''){
            alert('文集名不能为空');
            return;
        }
        let token = sessionStorage.getItem('__token__');
        let userName = sessionStorage.getItem('__username__');
        if(!token){
            alert('尚未登录');
            return;
        }
        fetch('/insertCollection',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name,token,userName}),
            mode: 'cors'
        }).then((res) => res.json())
            .then((data) =>{
                if(data.status===1){
                    let nc = this.state.collections;
                    nc.push({name,articles:[]});
                    this.setState({
                        collections:nc
                    });
                    input.value = '';
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            });
    }
    insertArticles(){
        let {collectionIndex,collections} = this.state;
        if(collections.length == 0){
            alert('未存在文集');
            return;
        }
        let collectionName = collections[collectionIndex].name;
        fetch('/insertArticle',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({collectionName}),
            mode: 'cors'
        }).then((res) => res.json())
            .then((data) =>{
                if(data.status===1){
                    let nc = this.state.collections;
                    console.log(nc,nc[collectionIndex])
                    nc[collectionIndex].articles.push({title:'无标题文章',content:''});
                    this.setState({
                        collections:nc,
                        articles:nc[collectionIndex].articles,
                        title:'无标题文章',
                        content:''
                    });
                }else{
                    alert(data.msg);
                }
            });
    }
    saveArticle(publish){
        let token = sessionStorage.getItem('__token__')
        if(!token){
            alert('登录信息失效，请重新登录！');
        }
        let {content,title,collectionIndex,articleIndex,collections} = this.state;
        let collectionName = collections[collectionIndex].name;
        console.log({content,title,collectionName,articleIndex});
        fetch('/saveArticle',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({content,title,collectionName,articleIndex,publish,token}),
            mode: 'cors'
        }).then((res) => res.json())
            .then((data) =>{
                if(data.status===1){
                    let nc = this.state.collections;
                    nc[collectionIndex].articles[articleIndex].title = title;
                    nc[collectionIndex].articles[articleIndex].content = content;
                    nc[collectionIndex].articles[articleIndex].publish = publish;
                    this.setState({
                        collections:nc
                    });
                }else{
                    alert(data.msg);
                }
            });
    }
    componentDidMount(){
        let token = sessionStorage.getItem('__token__');
        let userName = sessionStorage.getItem('__username__');
        if(!token){
            alert('登录信息失效，请重新登录！');
        }
        fetch('/getCollections',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({token}),
            mode: 'cors'
        }).then((res) => res.json())
            .then((data) =>{
                let {collections} = data;
                let articles = collections[0]?collections[0].articles:[];
                let title = articles[0]?articles[0].title:'';
                let content = articles[0]?articles[0].content:'';
                this.setState({
                    collections:collections,
                    articles:articles,
                    title:title,
                    content:content,
                    userName:userName
                })
            });
    }
    render(){
        return(
            <div className="gutter-example">
                <Row>
                    <Col span={3}>
                        <Collections collections={this.state.collections}
                                     insertCollection = {this.insertCollection}
                                     handleChange={this.collectionChange}
                                     userName = {this.state.userName}
                        />
                    </Col>
                    <Col span={3}>
                        <Articles articles={this.state.articles}
                                  insertArticles={this.insertArticles}
                                  handleChange={this.articleChange}
                        />
                    </Col>
                    <Col span={9}>
                        <div style={{height:'5%',minHeight:'5%',}}>
                            <input type="text" style={{height:'100%',width:'100%',border:'none',outline:'none',fontWeight:'bold',fontSize:'24px',paddingLeft:'10px'}}
                                   value={this.state.title}
                                   onChange={(e)=>{this.setState({
                                       title:e.target.value
                                })
                            }}/>
                        </div>
                        <div style={{background:'#dedede',height:'5%',minHeight:'5%',position:'relative'}}>
                            <a href="#" style={{position:'absolute',top:'50%',transform:'translateY(-50%)',textDecoration:'none'}} onClick={()=>this.saveArticle(0)}><Icon type="save"/> 保存文章</a>
                            <a href="#" style={{position:'absolute',top:'50%',right:'10px',transform:'translateY(-50%)',textDecoration:'none'}} onClick={()=>this.saveArticle(1)}><Icon type="upload"/> 发表文章</a>
                        </div>
                        <textarea value={this.state.content} onChange={(e)=>{
                            this.setState({
                                content:e.target.value
                            })
                        }}/>
                    </Col>
                    <Col span={9}>
                        <ReactMarkdown source={'# '+this.state.title+'\n'+this.state.content} className="result" />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Write;