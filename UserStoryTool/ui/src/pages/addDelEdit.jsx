import React, { Component } from "react";
import ReactDOM from "react-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import "./addDelEdit.css";


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

}
