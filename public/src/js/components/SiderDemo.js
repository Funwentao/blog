import { Layout, Menu, Icon,Input,Avatar ,Button} from 'antd';
import React,{Component} from 'react';

const { Header, Sider, Content } = Layout;
const { Search } = Input;


class SiderDemo extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            userName:'',
            address:'',
            occupation:'',
            collections:[],
            articles:[],
            key:'1'
        }
        this.toggle = this.toggle.bind(this);
        this.menuChangeHandler = this.menuChangeHandler.bind(this);
    }
    toggle ()  {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    menuChangeHandler(e){
        let {key} = e;
        this.setState({
            key
        })
    }
    showArticle(id){
        location.href = '/article/'+ id;
    }
    componentDidMount(){
        let userName = window.location.href.split('/').pop();
        fetch('/getUserInformation',{
            method:'post',
                headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({userName}),
            mode: 'cors'
        }).then((res) => res.json())
            .then((data)=>{
                let articles = [];
                data.collections.forEach((v) =>{
                    articles = [...articles,...v.articles];
                });
                articles.sort((v1,v2)=> v1.create_time > v2.create_time?-1:1);
                console.log(articles);
                this.setState({
                    address:data.address,
                    occupation:data.occupation,
                    userName:userName,
                    collections:data.collections,
                    articles:articles
                })
                console.log(data);
            })
    }
    render() {
        let {userName,address,occupation} = this.state;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width={300}
                >
                    <div className="logo" style={{display:this.state.collapsed?'none':'block'}}>
                        <Avatar size="large" icon="user"/>
                        <p className="information f20">{userName}</p>
                        <p className="information">{address}</p>
                        <p className="information"><Icon type="environment" />{occupation}</p>
                    </div>
                    <div style={{padding:'10px',display:this.state.collapsed?'none':'block'}}>
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.menuChangeHandler}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="tags" />
                            <span>分类</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        {sessionStorage.getItem('__username__')===this.state.userName&&<Button type="primary"  icon="edit" href='/write' style={{float:'right',margin:'20px'}}>写文章</Button>}
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
                        {this.state.key === '1' && <div>
                            <h1>首页（共{this.state.articles.reduce(((prev,cur) => prev + cur.publish),0)}篇文章)</h1>
                            {
                                this.state.articles.map((v, i) =>{
                                    if(v.publish){
                                        return(
                                            <div key={i} style={{padding: '10px', borderBottom: '1px solid #f6f6f6',cursor:'pointer'}} onClick={()=>this.showArticle(v._id)}>
                                                <h1>{v.title}</h1>
                                                <p><Icon type="calendar"/> {new Date(v.create_time).toLocaleString()} <Icon
                                                    type="folder"/> {v.collectionName}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        }
                        {this.state.key === '2' && <div>
                            <h1>分类（共{this.state.collections.length}个文集)</h1>
                            {
                                this.state.collections.map((v, i) =>
                                    <div key={i} style={{padding: '10px', borderBottom: '1px solid #f6f6f6'}}>
                                        <h2><Icon type="folder-open"/> {v.name}</h2>
                                        {
                                            v.articles.sort((v1,v2)=> v1.create_time > v2.create_time?-1:1).map((v, i) => {
                                                if(v.publish){
                                                    return (
                                                        <p key={i} style={{cursor:'pointer'}} onClick={()=>this.showArticle(v._id)}><Icon
                                                            type="calendar"/> {new Date(v.create_time).toLocaleString()} {v.title}
                                                        </p>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                        }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default SiderDemo;