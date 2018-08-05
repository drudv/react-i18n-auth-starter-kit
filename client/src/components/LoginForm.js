import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className="container">
    <CardContent>
      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">Login</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
          <TextField
            name="email"
            label="Email"
            error={errors.email != null}
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div className="field-line">
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
            error={errors.password != null}
            value={user.password}
          />
        </div>

        <div className="button-line">
          <Button variant="raised" type="submit" color="primary">
            Log in
          </Button>
        </div>

        Don't have an account? <Link to={'/signup'}>Create one</Link>.
      </form>
    </CardContent>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
