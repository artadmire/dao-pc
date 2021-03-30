import React ,{useState }from 'react'
import './index.css'
import { Form, Input, Button, Radio } from 'antd';
export default function Apply() {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const formItemLayout =
    {
        labelCol: { span: 24 },
        wrapperCol: { span: 12 },
      }
      const formItemLayout2 =
      {
          labelCol: { span:24 },
          wrapperCol: { span: 24 },
        }
    return (
        <div className="apply">
           <div className="title">
                 Apply for DAOstarter
           </div>
           <div className="apply-form">
           <Form
                form={form}
              {...formItemLayout}
                layout="vertical"
                >
                    <div>
                        <div className="form-item-title">
                            Name 
                         </div>
                         <div  className="form-item-content" >
                             <div>
                             <Input placeholder="input placeholder" className="input-controller1"/>
                             <label>
                              First
                             </label>
                             </div>
                             <div>
                                <Input placeholder="input placeholder" className="input-controller1"/>
                                <label>
                                    Last
                                </label>
                             </div>
                             
                         </div>
                    </div>
                    <Form.Item label="Email " {...formItemLayout2}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item label="Your Telegram ID" {...formItemLayout2}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item label="Project Name" {...formItemLayout2}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item label="Project Description" {...formItemLayout2}>
                            <TextArea
                                    placeholder="Controlled autosize"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                    </Form.Item>
                    <Form.Item name="radio-group" label="On which Blockchain do you want to launch? "  className="aa">
                        <Radio.Group>
                        <Radio value="a">Ethereum</Radio>
                        <Radio value="b">Binance Smart Chain</Radio>
                        <Radio value="c">Polkadot</Radio>
                        <Radio value="d">More than one</Radio>

                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="EmaWhen would you like to do a Token Launch on DuckStarter? il " {...formItemLayout}>
                          <Input placeholder="input placeholder" className="input-controller1"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="get-start">GET STARTED</Button>
                    </Form.Item>
          </Form>
           </div>
        </div>
    )
}
