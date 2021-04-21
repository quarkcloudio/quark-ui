import React, { useState } from 'react';
import { Button, Col, Input, Row, Form, message } from 'antd';
import { LockTwoTone, UserOutlined,SafetyCertificateTwoTone } from '@ant-design/icons';
import { Link, history, History, Helmet } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
import { post } from '@/services/action';
import logo from '@/assets/logo.png';
import styles from './style.less';

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
 const replaceGoto = (redirectUrl:string = '') => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace(redirectUrl);
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<any> = (props:any) => {

  const [submitting, setSubmitting] = useState(false);
  const [imageCaptcha, getImageCaptcha] = useState(props.captchaUrl);

  /**
   * 用户登录
   */
   const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const result = await post({
        actionUrl: props.api,
        ...values
      });

      if (result.status == 'success') {
        message.success(result.msg);
        // 记录登录凭据
        sessionStorage.setItem('token', result.data.token);
        replaceGoto(props.redirect);
        return;
      } else {
        message.error(result.msg);
        getImageCaptcha(props.captchaUrl+'?random='+Math.random());
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title? props.title : 'QuarkCMS'}</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={props.logo ? props.logo : logo} />
                <span className={styles.title}>{props.title? props.title : 'QuarkCMS'}</span>
              </Link>
            </div>
            <div className={styles.desc}>{props.description? props.description : '信息丰富的世界里，唯一稀缺的就是人类的注意力'}</div>
          </div>
          <div className={styles.main}>
            <Form
              onFinish={(values) => {
                handleSubmit(values);
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={
                   <UserOutlined
                    style={{
                      color: '#1890ff',
                    }}
                    className={styles.prefixIcon}
                  />}
                  placeholder="用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              >
                <Input
                  size="large"
                  type="password"
                  prefix={ <LockTwoTone className={styles.prefixIcon} />}
                  placeholder="密码"
                />
              </Form.Item>
              { imageCaptcha ? 
                <Form.Item
                  name="captcha"
                  rules= {[
                    {
                      required: true,
                      message: '请输入图形验证码!',
                    },
                  ]}
                >
                  <Row gutter={10}>
                    <Col span={16}>
                      <Input
                        size="large"
                        prefix={ <SafetyCertificateTwoTone className={styles.prefixIcon} /> }
                        placeholder="图形验证码"
                      />
                    </Col>
                    <Col span={8}>
                      {<img 
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          getImageCaptcha(props.captchaUrl+'?random='+Math.random());
                        }}
                        src={imageCaptcha}
                        alt="验证码"
                      />}
                    </Col>
                  </Row>
                </Form.Item>
              : null }
              <Form.Item>
                <Button loading={submitting} size="large" className={styles.submit} type="primary" htmlType="submit">登录</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <DefaultFooter
          copyright={props?.copyright}
          links={props?.links?.map((item:any, index:any) => {
            item['key']=index;
            return item;
          })}
        />
      </div>
    </>
  );
}

export default Login;