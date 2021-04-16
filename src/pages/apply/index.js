import React, {useState, useEffect } from 'react'
import './index.css'
import { Form, Input, Button, Radio, Upload, Slider } from 'antd';
import { InboxOutlined  } from '@ant-design/icons';

export default function Apply () {
  const [form] = Form.useForm();
  const [fundsVal, setFunds] = useState(0)
  const [raiseVal, setRaise] = useState(0)
  const { TextArea } = Input;
  useEffect(() => {
    const bg = document.getElementById('boxbg')
    bg.style.background = '#000'
    return () => {
      bg.style.background = '#FFF'
    }
  }, [])

  const formItemLayout =
    {
      labelCol: { span: 24 },
      wrapperCol: { span: 12 },
    }
  const formItemLayout2 =
      {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      }

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = (values) => {
    console.log(values);
  };
  function fundsChange (val) {
    setFunds(val)
  }
  function raiseChange (val) {
    setRaise(val)
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
          getValueFromEvent={normFile}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="form-name">
            <Form.Item  name="name1" label="Name" rules={[{ required: true, message: 'Please input your username!' }]}  >
              <Input placeholder=" " className="form-name-item"/>
              <span style={{color: '#FFF'}}>first</span>
            </Form.Item>
            <Form.Item  name="name2" label=" " rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input placeholder=" " className="form-name-item"/>
              <span style={{color: '#FFF'}}>last</span>
            </Form.Item>
          </div>
          <Form.Item  name="email" label="Email " {...formItemLayout2} rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item name="ID" label="Your Telegram ID" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item label="Project Name" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item name="description" label="Project Description" {...formItemLayout2}>
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 5, maxRows: 8 }}
            />
          </Form.Item>
          <Form.Item name="radio-group"
            label="On which Blockchain do you want to launch? "
            className="aa"
            rules={[{ required: true, message: 'Please selset your Content!' }]}>
            <Radio.Group>
              <Radio value="a">Ethereum</Radio>
              <Radio value="b">Binance Smart Chain</Radio>
              <Radio value="c">Polkadot</Radio>
              <Radio value="d">More than one</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item   label="When would you like to do a Token Launch on DuckStarter? "
            {...formItemLayout}
            rules={[{ required: true, message: 'Please input your Content!' }]}>
            <Input placeholder="" className="input-controller1"/>
          </Form.Item>
          <Form.Item name="funds" label="How much funds have you raised already?" {...formItemLayout}>
            <Slider onChange={fundsChange} className="slider" max={1000} />
            <span style={{color: '#FFF'}}>Selected Value: {fundsVal} $</span>
          </Form.Item>
          <Form.Item name="raise" label="How much are you looking to raise in the IDO/Public round?" {...formItemLayout}>
            <Slider onChange={raiseChange} className="slider" max={1000} />
            <span style={{color: '#FFF'}}>Selected Value: {raiseVal} $</span>
          </Form.Item>
          <Form.Item  label="Do you have a Roadmap?" {...formItemLayout2}>
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item name="website"  label="Your Website" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item   label="Do you have a Token Distribution and Tokenomics File?" {...formItemLayout2}>
            <Form.Item name="draggers" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files"  action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item name="Telegram" label="Your Project Telegram Channel" {...formItemLayout}>
            <Input placeholder=" " className="input-controller2"/>
          </Form.Item>
          <Form.Item  name="Twitter"  label="Your Project Twitter URL" {...formItemLayout}>
            <Input placeholder=" " className="input-controller2"/>
          </Form.Item>
          <Form.Item label="Additional Files you would like to share with us" {...formItemLayout2}>
            <Form.Item name="draggerss" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item label="Additional Information you would like to share with us" {...formItemLayout2}>
            <Form.Item name="dragger4" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <TextArea
                placeholder="Controlled autosize"
                autoSize={{ minRows: 5, maxRows: 8 }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item name="ee" label="Where did you hear about Duckstarter? " {...formItemLayout}
            rules={[{ required: true, message: 'Please input your Content!' }]}>
            <Input placeholder=" " className="input-controller2"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="get-start">GET STARTED</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
