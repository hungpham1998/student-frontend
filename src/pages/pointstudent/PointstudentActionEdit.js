import React, { Component } from 'react'

import { actFetchStudentRequest } from '../../actions/Student';
import { actAddPointstudentRequest, actUpdatePointstudentRequest, actGetPointstudentRequest } from '../../actions/Pointstudent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchSubjectRequest } from '../../actions/Subject';
import { actFetchSemesterRequest } from '../../actions/Semester';

class PointstudentActionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PointKT1: 0,
            PointKT2: 0,
            PointCC: 0,
            PointT: 0,
            PointGK:0,
            subjectId:'',
            studentId: '',
            // semesterId:''
        };
    }

    componentDidMount() {
        const { match } = this.props;
        if (match) {
            var Id = match.params.id;
            this.props.onEditPointstudent(Id);
        }
        this.props.fetchAllSubject();
        this.props.fetchAllStudent();
        this.props.fetchAllSemester();
    }


    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            const { itemEditing } = nextProps;
            console.log(itemEditing);
            this.setState({
                Id : itemEditing[0].Id,
                PointKT1 :  itemEditing[0].PointKT1,
                PointKT2 : itemEditing[0].PointKT2,
                PointCC: itemEditing[0].PointCC,
                PointT: itemEditing[0].PointT,
                PointGK: itemEditing[0].PointGK,
                subjectId: itemEditing[0].subjectId,
                studentId: itemEditing[0].studentId,
                semesterId: itemEditing[0].semesterId
            });
            console.log(this.state)
        }
    }

    
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();
        const {Id, PointKT1, PointKT2, PointCC,PointT,PointGK,studentId, subjectId,semesterId} = this.state;
        const { history } = this.props;
        var student = {
            Id: Id,
            PointKT1: parseFloat(PointKT1),
            PointKT2: parseFloat(PointKT2),
            PointCC: parseFloat(PointCC),
            PointT: parseFloat(PointT),
            PointGK:parseFloat(PointGK),
            subjectId:subjectId,
            studentId: studentId,
          //  semesterId: semesterId
        };
       
        this.props.onUpdatePointstudent(student);
        this.setState({
            PointKT1: 0,
            PointKT2: 0,
            PointCC: 0,
            PointT: 0,
            PointGK:0,
            subjectId:'',
            studentId: '',
           // semesterId:''
        })
        
        history.goBack();
    }

    selectSubject = (data) => {
        this.setState({
            subjectId: data.target.value
        })
    }
    selectLearnYear = (data) => {
        this.setState({
            learnyearId: data.target.value
        })
    }
    selectStudent = (data) => {
        this.setState({
            studentId: data.target.value
        })
    }


    render() {
        const { PointGK, PointKT1, PointKT2, PointCC, PointT, subjectId, studentId, semesterId } = this.state;
        const { subject, semester, student } = this.props;
        return (
            <div className="container p-5">
                <form onSubmit={this.onSave}>
                    <div className="form-group row">
                        <div className="col">
                        <label> Môn Học: </label>
                            <select className="form-control custom-select custom-select-sm" onChange={this.selectSubject}
                            value={subjectId} 
                            >
                                {  (
                                    subject.map((item, index) => {
                                            return  <option value={item.Id}  key={index} >{item.Title}</option>
                                        })
                                ) 
                                }
                            </select> 
                        </div>
                        <div className="col">
                            <label>Học Sinh: </label>
                            <select className="form-control custom-select custom-select-sm" onChange={this.selectStudent}
                            value={studentId} 
                            >
                                {  (
                                    student.map((item, index) => {
                                            return  <option value={item.Id}  key={index} >{item.Frist_Name + " " + item.Last_Name}</option>
                                        })
                                ) 
                                }
                            </select> 
                        </div>
                    </div>
                    <div className="form-group row">
                        {/* <div className="col">
                            <label>Năm Học: </label>
                            <select className="form-control custom-select custom-select-sm" onChange={this.selectLearnYear}
                                 value={semesterId} 
                            >
                                {  (
                                    semester.map((item, index) => {
                                            return  <option value={item.Id}  key={index} >{item.Title}</option>
                                        })
                                    ) 
                                }
                            </select> 
                        </div> */}
                        <div className="col">
                            <label>Điểm kiểm tra lần 1: </label>
                            <input
                                type="number"
                                className="form-control"
                                name="PointKT1"
                                value={PointKT1}
                                onChange={this.onChange}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Điểm kiểm tra lần 2: </label>
                            <input
                                type="number"
                                className="form-control"
                                name="PointKT2"
                                value={PointKT2}
                                onChange={this.onChange}
                                />
                        </div>
                        <div className="col">
                            <label>Điểm Giữa kỳ: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="PointGK"
                                    value={PointGK}
                                    onChange={this.onChange}
                                    />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>Cuối Kỳ: </label>
                            <input
                                className="form-control"
                                type="number"
                                name="PointCC"
                                value={PointCC}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="col">
                            <label>Điểm thi: </label>
                            <input
                                type="number"
                                className="form-control"
                                name="PointT"
                                value={PointT}
                                onChange={this.onChange}
                            /> 
                        </div>
                    </div>
                    <Link to="/pointstudentlist" className="btn btn-danger mr-10">
                        Trở Lại
                    </Link>
                    <button type="submit" className="btn btn-primary">Lưu Lại</button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       itemEditing : state.itemEditing,
        subject: state.subject,
        student: state.student,
        semester: state.semester
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdatePointstudent : (pointstudent) => {
            dispatch(actUpdatePointstudentRequest(pointstudent));
        },
        fetchAllSubject : () => {
            dispatch(actFetchSubjectRequest());
        },
        fetchAllStudent : () => {
            dispatch(actFetchStudentRequest());
        },
        fetchAllSemester : () => {
            dispatch(actFetchSemesterRequest());
        },
        onEditPointstudent: (id) => {
            dispatch(actGetPointstudentRequest(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PointstudentActionEdit);
