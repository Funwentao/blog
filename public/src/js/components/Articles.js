import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
class Articles extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="articles" style={{background:'#dedede'}}>
                <p style={{padding:'10px'}}>
                    <a href="#" style={{color:'rgba(0, 0, 0, 0.65)'}} onClick={this.props.insertArticles}><Icon type="plus"/> 新增文章</a>
                </p>
                <Menu style={{background:'#dedede'}} defaultSelectedKeys={['0']} onClick={this.props.handleChange}>
                    {
                        this.props.articles.map((c,i) => <Menu.Item key={i} onClick={(c) =>this.props.handleChange(c)}><Icon type={c.publish?"check":"close"}></Icon>{c.title} <Icon type="setting"/></Menu.Item>)
                    }
                </Menu>
            </div>
        )
    }
}
export default Articles;