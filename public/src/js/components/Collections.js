import React,{Component} from 'react';
import {Button,Icon,Menu,Input} from 'antd';



class Collections extends Component{
    constructor(){
        super();
        this.state = {
            show:false,
            collections:[],
        }
        this.showHandler = this.showHandler.bind(this);
    }
    showHandler(){
        this.setState({
            show:!this.state.show
        })
        this.input.value = '';
    }
    render(){
        return (
            <div className="collection" style={{background:'#001529'}}>
                <p style={{textAlign:'center'}}>
                    <Button href={"/blog/"+this.props.userName} style={{width:'90%',marginTop:'20px'}} type="primary" ghost>返回首页</Button>
                </p>
                <p style={{padding:'0px 10px'}}>
                    <a href="#" onClick={this.showHandler}><Icon type="plus"/> 新建文集</a>
                </p>
                <div style={{display:this.state.show?'block':'none'}}>
                    <input placeholder="输入文集名" ref={(input)=>{this.input=input}} style={{width:'100%'}}/>
                    <p style={{marginTop:'10px'}}>
                        <Button type='primary'onClick={() => {this.props.insertCollection(this.input)}}>确定</Button>
                        <Button ghost onClick={this.showHandler} style={{marginLeft:'10px'}}>取消</Button>
                    </p>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['0']} onClick={this.props.handleChange}>
                    {
                        this.props.collections.map((c,i) => <Menu.Item key={i}>{c.name} <Icon type="setting"/></Menu.Item>)
                    }
                </Menu>
            </div>
        )
    }
}
export default Collections;