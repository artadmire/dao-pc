import React, {useState, useEffect, useMemo } from 'react'
import './index.css'
import { Form, Input, Button, Radio, Upload, Slider, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { postApply } from '../../service'


export default function Apply () {
  const [form] = Form.useForm();
  const [fundsVal, setFunds] = useState(0)
  const [raiseVal, setRaise] = useState(0)
  const [roadMap, setRoadMap] = useState('')
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  // const [fileInfo, setFileList] = useState({roadMap: [], file1: [], file2: []})
  const { TextArea } = Input;

  const map = useMemo(() => ({
    roadMap: setRoadMap,
    file1: setFile1,
    file2: setFile2
  }), [])

  function fileProps (name) {
    return {
      beforeUpload (file) {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
          message.error('Image must smaller than 20MB!');
        }
        return isLt20M;
      },
      name: 'file',
      action: 'http://www.daostarter.pro/api/starter/upload',
      onChange (info) {
        console.info(info, 'info')
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          const {response } = info.file
          const {data = {}} = response || {}
          map[name] &&  map[name](data.path)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    }

  }

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
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  const onFinish = (values) => {
    console.log(values);
    values.roadMap = roadMap;
    values.file1 = file1;
    values.file2 = file2
    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        (key === 'raised' || key === 'raiseIDO') ? values[key] = 0 : values[key] = ''
      }
    })
    postApply(values).then(() => {
      message.info('上传成功')
    }, () => {message.info('上传失败，请重试')})
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
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="form-name">
            <Form.Item help="first" name="firstName" label="Name" rules={[{ required: true, message: 'Please input your username!' }]}  >
              <Input placeholder=" " className="form-name-item"/>
            </Form.Item>
            <Form.Item  help="last" name="lastName" label=" " rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input placeholder=" " className="form-name-item"/>
            </Form.Item>
          </div>
          <Form.Item  name="email" label="Email " {...formItemLayout2} rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item name="telegramId" label="Your Telegram ID" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item  name="projectName" label="Project Name" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item name="projectDescription" label="Project Description" {...formItemLayout2}>
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 5, maxRows: 8 }}
            />
          </Form.Item>
          <Form.Item name="blockchain"
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
          <Form.Item name="startTime"  label="When would you like to do a Token Launch on DuckStarter? "
            {...formItemLayout}
            rules={[{ required: true, message: 'Please input your Content!' }]}>
            <Input placeholder="" className="input-controller1"/>
          </Form.Item>
          <Form.Item help={`Selected Value: ${fundsVal} $`} name="raised" label="How much funds have you raised already?" {...formItemLayout}>
            <Slider onChange={fundsChange} className="slider" max={100000} />
          </Form.Item>
          <Form.Item help={`Selected Value: ${raiseVal} $`} name="raiseIDO" label="How much are you looking to raise in the IDO/Public round?" {...formItemLayout}>
            <Slider onChange={raiseChange} className="slider" max={100000} />
          </Form.Item>
          <Form.Item name="roadMap"  label="Do you have a Roadmap?" {...formItemLayout2}>
            <Form.Item name="roadMap" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger disabled={roadMap} {...fileProps('roadMap')} >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{color: roadMap ? '#999' : '#40a9ff'}} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item name="webSite"  label="Your Website" {...formItemLayout2}>
            <Input placeholder="" className="input-controller2"/>
          </Form.Item>
          <Form.Item   label="Do you have a Token Distribution and Tokenomics File?" {...formItemLayout2}>
            <Form.Item name="file1" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger {...fileProps('file1')} disabled={file1}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{color: file1 ? '#999' : '#40a9ff'}} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item name="projectTelegram" label="Your Project Telegram Channel" {...formItemLayout}>
            <Input placeholder=" " className="input-controller2"/>
          </Form.Item>
          <Form.Item  name="projectTwitter"  label="Your Project Twitter URL" {...formItemLayout}>
            <Input placeholder=" " className="input-controller2"/>
          </Form.Item>
          <Form.Item label="Additional Files you would like to share with us" {...formItemLayout2}>
            <Form.Item name="file2" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger {...fileProps('file2')} disabled={file2} >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{color: file2 ? '#999' : '#40a9ff'}} />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item name="information" label="Additional Information you would like to share with us" {...formItemLayout2}>
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 5, maxRows: 8 }}
            />
          </Form.Item>
          <Form.Item name="hear" label="Where did you hear about Duckstarter? " {...formItemLayout}
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
