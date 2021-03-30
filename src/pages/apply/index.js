import React ,{useState }from 'react'
import './index.css'
import { Form, Input, Button, Radio,Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

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

        const normFile = (e) => {
            console.log('Upload event:', e);
          
            if (Array.isArray(e)) {
              return e;
            }
          
            return e && e.fileList;
          };
    return (
        <div className="apply">
           <div className="title">
                 Apply for DAOstarter
           </div>
           <div className="apply-form">
           <Form
                form={form}
              {...formItemLayout}
              getValueFromEvent={normFile}
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
                    <Form.Item label="When would you like to do a Token Launch on DuckStarter? " {...formItemLayout}>
                          <Input placeholder="input placeholder" className="input-controller1"/>
                    </Form.Item>
                    <Form.Item label="Do you have a Roadmap?" {...formItemLayout2}>
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Your Website" {...formItemLayout2}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                     </Form.Item>
                    <Form.Item label="Do you have a Token Distribution and Tokenomics File?" {...formItemLayout2}>
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Your Project Telegram Channel" {...formItemLayout}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item label="Your Project Twitter URL" {...formItemLayout}>
                          <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item label="Additional Files you would like to share with us" {...formItemLayout2}>
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Additional Information you would like to share with us" {...formItemLayout2}>
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Where did you hear about Duckstarter? " {...formItemLayout}>
                            <Input placeholder="input placeholder" className="input-controller2"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="get-start">GET STARTED</Button>
                    </Form.Item>
          </Form>
           </div>
        </div>
    )
}
