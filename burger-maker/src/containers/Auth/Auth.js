import React, {Component} from 'react';
import validator from 'validator';
import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import styles from './Auth.css';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }
  checkValidity = (value,rules) => {
    if (!rules){
      return true;
    }
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }
    if (rules.minLength) {
      isValid = isValid && (value.length >= rules.minLength);
    }
    if (rules.maxLength) {
      isValid = isValid && (value.length <= rules.maxLength);
    }
    if (rules.email) {
      isValid = isValid && validator.isEmail(value);
    }
    if (rules.zipcode) {
      isValid = isValid && validator.isPostalCode(value, 'any');
    }
    return isValid;
  };
  inputChangedHandler = (id, event) => {
    const updatedControls = {
      ...this.state.controls,
      [id]: {
        ...this.state.controls[id],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[id].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {isSignUp: !prevState.isSignUp};
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map((formElement) => {
      return (
        <Input elementType = {formElement.config.elementType}
          elementConfig = {formElement.config.elementConfig}
          value= {formElement.config.value}
          key = {formElement.id}
          changed = {this.inputChangedHandler.bind(this, formElement.id)}
          invalid = {!formElement.config.valid}
          shouldValidate = {formElement.config.validation}
          touched = {formElement.config.touched}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner/>;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to= "/"/>
    }
    return (
      <div className = {styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit= {(event) => this.submitHandler(event)}>
          {form}
          <Button buttonType="Success">SUBMIT</Button>
        </form>
        <Button
          buttonType="Danger"
          clicked = {this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, isSignUp) => dispatch(actions.auth(username, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
