import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import "./addDelEdit.css";


export class AddDelEdit extends Component {
    constructor(props) {
    super(props);
    this.state = {
        modal: false,
        events: [
        {
            id: 0,
            time: "",
            title: "",
            location: "",
            description: ""
        },

        ]
    };
    }
    addEvent = () => {
    var newArray = [...this.state.events];
    newArray.push({
        id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
        time: this.state.time,
        title: this.state.title,
        location: this.state.location,
        description: this.state.description
    });
    this.setState({ events: newArray });
    this.setState({
        time: "",
        title: "",
        location: "",
        description: ""
    });
    };
    handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
        [inputName]: nextValue
    });
    };
    handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
    };
    toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
    };
    render() {
    return (
        <React.Fragment>
        <MDBContainer>
            <MDBRow>
            <MDBCol md="9" className="mb-r">
                <h2 className="text-uppercase my-3">Project :</h2>
                <div id="events">
                {this.state.events.map(event => (
                    <Event
                    key={event.id}
                    id={event.id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description}
                    onDelete={this.handleDelete}
                    />
                ))}
                </div>
                <MDBRow className="mb-4">
                <MDBCol xl="3" md="6" className="mx-auto text-center">
                    <MDBBtn color="info" rounded onClick={this.toggleModal}>
                    Add Story
                    </MDBBtn>
                    <MDBBtn color="warning">
                      Edit Story
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md="3">



            </MDBCol>
            </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
            <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
            >
            Add new Story
            </MDBModalHeader>
            <MDBModalBody>
                <form className="mx-3 grey-text">
                    <MDBInput
                      name="Name"
                      label="User Story title"
                      // hint="User Story title"
                      group
                      type="text"
                      getValue={this.handleInputChange("time")}
                    />
                    <MDBInput
                      name="As..."
                      label="As - Description"
                      group
                      type="text"
                      getValue={this.handleInputChange("title")}
                    />
                    <MDBInput
                      name="I...."
                      label="I - Description"
                      group
                      type="text"
                      getValue={this.handleInputChange("location")}
                    />
                    <MDBInput
                      name="So...."
                      label="So - Description"
                      group
                      type="textarea"
                      getValue={this.handleInputChange("description")}
                    />
                  </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
            <MDBBtn
                color="info"
                onClick={() => {
                this.toggleModal();
                this.addEvent();
                }}
            >
                Add
            </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </React.Fragment>
    );
    }
}
class Event extends Component {
    render() {
    return (
        <React.Fragment>
        <div className="media mt-1">
            <h3 className="h3-responsive font-weight-bold mr-3">
            {this.props.time}
            </h3>
            <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
                color="danger"
                className="ml-2 float-right"
                onClick={() => this.props.onDelete(this.props.id)}
            >
                -
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {this.props.location && (
                <React.Fragment>
                <p className="font-smaller mb-0">
                    <MDBIcon icon="location-arrow" /> {this.props.location}
                </p>
                </React.Fragment>
            )}
            </div>
        </div>
        {this.props.description && (
            <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
            {this.props.description}
            </p>
        )}
        </React.Fragment>
    );
    }
}
