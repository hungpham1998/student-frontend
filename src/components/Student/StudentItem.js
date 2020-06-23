import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBModal } from 'mdbreact';

export default class StudentItem extends Component {
    state = {
        modal: false
      }
    
    toggle = () => {
    this.setState({
        modal: !this.state.modal
    });
    }
    onDelete = (id) => {
   
        this.props.onDelete(id);
    }

    render() {
        var { student, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{student.Code}</td>
                <td>{student.Frist_Name}</td>
                <td>{student.Last_Name}</td>
                <td> {moment(student.Brithday).format("DD/MM/YYYY")}</td>
                <td> {student.Address }</td>
                <td> { student.learnclass != null ? student.learnclass.Title:''}</td>
                <td>
                    <Link
                        to={`/student/${student.Id}/edit`}
                        className="btn btn-yellow darken-2"
                    >
                        Sửa
                </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.toggle}
                    >
                        Xóa
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
                                 <MDBModalBody>
                                <span style={{ color: 'black' }}> Bạn chắc chắn muốn xóa  <b> {student.Frist_Name +''+ student.Last_Name }</b>  </span>
                                </MDBModalBody>
                                <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                <MDBBtn color="primary" onClick={() => this.onDelete(student.id)}>Xóa</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                </button>
                    <Link
                        className="btn btn-green accent-3"
                        to={`/student/${student.Id}/export`}>export</Link>
                </td>
            </tr>
        );
    }
}
