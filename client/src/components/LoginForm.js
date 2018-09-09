import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';

const LoginForm = ({
  form,
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
}) => (
  <Form action="/" onSubmit={onSubmit}>
    {successMessage && (
      <Form.Item>
        <Alert message={successMessage} type="success" />
      </Form.Item>
    )}
    {errors.summary && (
      <Form.Item>
        <Alert message={errors.summary} type="error" />
      </Form.Item>
    )}
    <Form.Item
      label="E-mail"
      validateStatus={errors.email != null ? 'error' : null}
      help={errors.email}
    >
      {form.getFieldDecorator('email', {
        rules: [
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your e-mail!' },
        ],
        initialValue: user.email,
      })(
        <Input
          name="email"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="E-mail"
          onChange={onChange}
        />
      )}
    </Form.Item>
    <Form.Item
      label="Password"
      validateStatus={errors.password != null ? 'error' : null}
      help={errors.password}
    >
      {form.getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input password!' }],
        initialValue: user.password,
      })(
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Log in
      </Button>
      <p>
        Don't have an account? <Link to={'/signup'}>Create one</Link>.
      </p>
    </Form.Item>
  </Form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
