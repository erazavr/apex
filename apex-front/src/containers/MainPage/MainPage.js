import React, {Component} from 'react';
import {connect} from "react-redux";
import FormElement from "../../components/FormElement/FormElement";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {postCommon} from "../../store/actions /commonsActions";

class MainPage extends Component {
  state = {
    name: '',
    lastName: '',
    patronymic: '',
    phone: '',
    address: '',
    uid: '',
  };
  submitFormHandler = event => {
    event.preventDefault();
    this.props.postCommon({...this.state})
    this.setState({
      name: '',
      lastName: '',
      patronymic: '',
      phone: '',
      address: '',
      uid: '',
    })
  };
  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  render() {
    const user = this.props.user;
    let form;
    if(!user) {
      form = <h1>Войдите в систему</h1>
    } else if(user && user.role === 'admin') {
      form = (
        <>
          <h1 className="mb-5">Добавление пользователя</h1>
          {this.props.error &&
          <Alert color='danger'>{this.props.error.error}</Alert>
          }
          <Form onSubmit={this.submitFormHandler}>
            <FormElement
              propertyName='name'
              title='Имя'
              value={this.state.name}
              onChange={this.inputChangeHandler}
              type='text'
              autoComplete="current-name"
            />
            <FormElement
              propertyName='lastName'
              title='Фамилия'
              value={this.state.lastName}
              onChange={this.inputChangeHandler}
              type='text'
              autoComplete="current-lastName"
            />
            <FormElement
              propertyName='patronymic'
              title='Отчество'
              value={this.state.patronymic}
              onChange={this.inputChangeHandler}
              type='text'
              autoComplete="current-patronymic"
            />
            <FormElement
              propertyName='phone'
              title='Телефон'
              value={this.state.phone}
              onChange={this.inputChangeHandler}
              type='tel'
              autoComplete="current-phone"
            />
            <FormElement
              propertyName='address'
              title='Адрес'
              value={this.state.address}
              onChange={this.inputChangeHandler}
              type='text'
              autoComplete="current-address"
            />
            <FormElement
              propertyName='uid'
              title='ИНН'
              value={this.state.uid}
              onChange={this.inputChangeHandler}
              type='number'
              autoComplete="current-password"
            />
            <FormGroup row>
              <Col sm={{offset: 2, size: 10}}>
                <Button color='primary' type='submit'>
                  Ok
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </>
      )
    } else if (user && user.role !== 'admin') {
      form = <h1>У вас не достаточно прав, чтобы добавлять пользователя!</h1>
    }
    return (
      <>
        {form}
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});
const mapDispatchToProps = dispatch => ({
  postCommon: comData => dispatch(postCommon(comData))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);