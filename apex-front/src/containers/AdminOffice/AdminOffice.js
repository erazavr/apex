import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCommons} from "../../store/actions /commonsActions";
import {Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Redirect} from "react-router-dom";
import { toast } from 'react-toastify';


class AdminOffice extends Component {
  componentDidMount() {
    this.props.getCommons();
  }

  render() {
    const commons = this.props.commons;
    const user = this.props.user;
    let card;
    if(!commons) {
      card = <h1>Здесь пока пусто</h1>
    } else if(!user) {
      return <Redirect from="/admin_office" to="/login" />
    } else if(user && user.role !== 'admin') {
      toast.error('У вас нет прав находиться на этой странице!');
      return <Redirect from="/admin_office" to="/" />
    } else if(user && user.role === 'admin') {
      card = commons && Object.keys(commons).map(com => (
        <Col sm={4} key={commons[com]._id} className='mb-5'>
          <Card >
            <CardBody>
              <CardTitle tag="h5">Информация:</CardTitle>
              <CardText>Имя: <strong>{commons[com].name}</strong></CardText>
              <CardText>Фамилия: <strong>{commons[com].lastName}</strong></CardText>
              <CardText>Отчество: <strong>{commons[com].patronymic}</strong></CardText>
              <CardText>Адрес: <strong>{commons[com].address}</strong></CardText>
            </CardBody>
          </Card>
        </Col>
      ))
    }
    return (
      <>
        <Row>
        {card}
        </Row>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
  commons: state.commons.commons
});
const mapDispatchToProps = dispatch => ({
  getCommons: () => dispatch(getCommons())
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminOffice);