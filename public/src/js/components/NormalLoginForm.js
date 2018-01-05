import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import fetch from 'isomorphic-fetch';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLogin:true
        }
    }
    handleSubmit  (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const url = this.state.isLogin?'/login':'/register';
            if (!err) {
                fetch(url,{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(values),
                    mode: 'cors'
                }).then((res) => res.json())
                    .then((data) =>{
                        if(this.state.isLogin){
                            if(data.status){
                                sessionStorage.setItem('__token__', data.token)
                                sessionStorage.setItem('__username__', data.userName)
                                window.location='/blog/'+values.userName;
                            }else{
                                alert(data.msg);
                            }
                        }else{
                            alert(data.msg);
                        }
                    });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h1>Fun Blog</h1>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                {
                    !this.state.isLogin && <FormItem>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your Address!' }],
                        })(
                            <Input prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Address" />
                        )}
                    </FormItem>

                }
                {
                    !this.state.isLogin && <FormItem>
                        {getFieldDecorator('occupation', {
                            rules: [{ required: true, message: 'Please input your Occupation!' }],
                        })(
                            <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Occupation" />
                        )}
                    </FormItem>

                }
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox style={{display:this.state.isLogin?'block':'none'}}>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {this.state.isLogin?'Log in':'Register'}
                    </Button>
                    Or <a href="#" onClick={()=>this.setState({isLogin:!this.state.isLogin})}>{this.state.isLogin?'register now!':'Log in now!'}</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
