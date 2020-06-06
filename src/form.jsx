import React, { Component } from "react";

class Form extends Component {
  obj = [
    {
      tag: "input",
      name: "first_name",
      type: "text",
      human_label: "First Name",
    },
    {
      tag: "input",
      name: "last_name",
      type: "text",
      human_label: "Last Name",
    },
    {
      tag: "input",
      name: "email",
      type: "email",
      human_label: "Email Address",
    },
    {
      tag: "input",
      name: "phone_number",
      type: "text",
      human_label: "Phone Number",
    },
    {
      tag: "input",
      name: "job_title",
      type: "text",
      human_label: "Job Title",
    },
    {
      tag: "input",
      name: "date_of_birth",
      type: "date",
      human_label: "Date of Birth",
    },
    {
      tag: "input",
      name: "parental_consent",
      type: "checkbox",
      human_label: "Parental Consent",
      conditional: {
        name: "date_of_birth",
        show_if: (value) => {
          const now = new Date();
          return (
            value >=
            now.getFullYear() - 13 + "-" + now.getMonth() + "-" + now.getDate()
          );
        },
      },
    },
  ];

  constructor() {
    super();
    this.state = {};
    this.conditionalName = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //On submit data gets stored to the state
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    const renData = this.obj.map((obj) => {
      if (
        !obj.conditional ||
        obj.conditional.show_if(this.state[obj.conditional.name])
      ) {
        return (
          <div key={obj.name} onChange={this.handleChange}>
            {" "}
            {obj.human_label}{" "}
            <input
              type={obj.type}
              name={obj.name}
              onChange={this.handleChange}
            />{" "}
          </div>
        );
      }
    });
    return (
      <form onSubmit={this.handleSubmit}>
        {renData}
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

export default Form;
