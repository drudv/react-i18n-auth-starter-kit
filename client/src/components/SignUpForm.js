import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';

const SignUpForm = ({ form, onSubmit, onChange, errors, user }) => (
  <Form action="/" onSubmit={onSubmit}>
    {errors.summary && (
      <Form.Item>
        <Alert message={errors.summary} type="error" />
      </Form.Item>
    )}
    <Form.Item
      label="Name"
      validateStatus={errors.name != null ? 'error' : null}
      help={errors.name}
    >
      {form.getFieldDecorator('name', {
        rules: [
          { required: true, message: 'Please input your name!' },
        ],
        initialValue: user.name,
      })(
        <Input
          name="name"
          placeholder="Name"
          onChange={onChange}
        />
      )}
    </Form.Item>

    <Form.Item
      label="E-mail"
      validateStatus={errors.email != null ? 'error' : null}
      help={errors.email}
    >
      {form.getFieldDecorator('email', {
        rules: [
          { required: true, message: 'Please input your email!' },
        ],
        initialValue: user.email,
      })(
        <Input
          name="email"
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
        rules: [
          { required: true, message: 'Please input your email!' },
        ],
        initialValue: user.password,
      })(
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
      )}
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Create New Account
      </Button>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </Form.Item>
  </Form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const WrappedSignUpForm = Form.create()(SignUpForm);

export default WrappedSignUpForm;
