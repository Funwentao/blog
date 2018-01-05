import React,{Component} from 'react';
import {Avatar} from 'antd';
import MyMenu from './MyMenu';
class LeftContent extends Component{
    render(){
        return(
            <div className="left-content">
                <div className="black-bg"></div>
                <div className="information" style={{color:'#ccc'}}>
                    <Avatar size="large" icon="user"/>
                    <p className="name">Fun</p>
                    <p className="message">一个奋进的程序猿</p>
                </div>
                <MyMenu/>
            </div>
        )
    }
}
export default LeftContent;