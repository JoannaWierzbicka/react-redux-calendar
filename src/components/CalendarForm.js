import React from "react";
import StyledInput from "../styled/StyledInput";
import StyledDiv from "../styled/StyledDiv";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";

class CalendarForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    errors: [],
  };

  render() {
    return (
      <StyledForm action="" onSubmit={this.handleSubmit}>
        <ul>{this.renderErrors()}</ul>
        <StyledDiv>
          <label>
            Data:{" "}
            <StyledInput
              name="date"
              onChange={this.handleFieldChange}
              value={this.state.date}
              placeholder="RRRR-MM-DD"
            />
          </label>
        </StyledDiv>
        <StyledDiv>
          <label>
            Godzina:{" "}
            <StyledInput
              name="time"
              onChange={this.handleFieldChange}
              value={this.state.time}
              placeholder="HH:MM"
            />
          </label>
        </StyledDiv>

        <StyledDiv>
          <label>
            Imię:{" "}
            <StyledInput
              name="firstName"
              onChange={this.handleFieldChange}
              value={this.state.firstName}
            />
          </label>
        </StyledDiv>
        <StyledDiv>
          <label>
            Nazwisko:{" "}
            <StyledInput
              name="lastName"
              onChange={this.handleFieldChange}
              value={this.state.lastName}
            />
          </label>
        </StyledDiv>
        <StyledDiv>
          <label>
            Email:{" "}
            <StyledInput
              name="email"
              onChange={this.handleFieldChange}
              value={this.state.email}
              placeholder="nazwa@poczty.pl"
            />
          </label>
        </StyledDiv>
        <StyledDiv>
          <StyledButton>ZAPISZ</StyledButton>
        </StyledDiv>
      </StyledForm>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({
      errors,
    });

    if (errors.length === 0) {
      this.saveMeeting();
      this.clearFormFields();
    }
  };

  validateForm() {
    const errors = [];

    if (!this.isDateCorrect()) {
      errors.push("Popraw wprowadzoną datę");
    }

    if (!this.isTimeCorrect()) {
      errors.push("Popraw wprowadzoną godiznę");
    }

    if (!this.isFirstNameCorrect()) {
      errors.push("Wprowadź imię");
    }

    if (!this.isLastNameCorrect()) {
      errors.push("Wprowadż nazwisko");
    }

    if (!this.isEmailCorrect()) {
      errors.push("Wprowadź poprawny adres email");
    }

    return errors;
  }

  isDateCorrect() {
    const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    return pattern.test(this.state.date);
  }

  isTimeCorrect() {
    const pattern = /^[0-9]{2}:[0-9]{2}$/;

    return pattern.test(this.state.time);
  }

  isFirstNameCorrect() {
    return this.state.firstName.length > 0;
  }

  isLastNameCorrect() {
    return this.state.lastName.length > 0;
  }

  isEmailCorrect() {
    const pattern = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;

    return pattern.test(this.state.email);
  }

  handleFieldChange = (e) => {
    if (this.isFieldNameCorrect(e.target.name)) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  saveMeeting() {
    const { saveMeeting } = this.props;

    if (typeof saveMeeting === "function") {
      saveMeeting(this.getFieldsData());
    }
  }

  clearFormFields() {
    const fieldsData = this.getFieldsData();
    for (const prop in fieldsData) {
      fieldsData[prop] = "";
    }

    this.setState(fieldsData);
  }

  getFieldsData() {
    const fieldsData = Object.assign({}, this.state);
    delete fieldsData["errors"];

    return fieldsData;
  }

  isFieldNameCorrect(name) {
    const fieldsData = this.getFieldsData();

    return typeof fieldsData[name] !== "undefined";
  }

  renderErrors() {
    return this.state.errors.map((err, index) => <li key={index}>{err}</li>);
  }
}

export default CalendarForm;
