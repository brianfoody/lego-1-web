import React from "react";
import "./App.css";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      message: "",
      submitted: false,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.company || !this.state.message) {
      window.alert("Yo! We need all your details.");
    }

    this.submit();
  }

  submit = async () => {
    try {
      this.setState({
        loading: true
      });
      await fetch(config.API_URL + "contact", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          name: this.state.name,
          company: this.state.company,
          message: this.state.message
        })
      });

      this.setState({
        name: "",
        company: "",
        message: "",
        submitted: true
      });
    } catch (err) {
      window.alert(
        "Well this is embarrassing. Our 'Server' is down. Send us an email 😂"
      );
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Contact Us</h1>
        </header>

        <section>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              value={this.state.company}
              onChange={this.handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={this.state.message}
              onChange={this.handleChange}
            />

            {this.state.loading ? (
              <p class="submitLoader"> Submitting....</p>
            ) : (
              <input type="submit" value="Submit" />
            )}

            {this.state.submitted && (
              <p class="successMessage">
                Thanks for contacting us, we'll be in touch shortly.
              </p>
            )}
          </form>
        </section>
      </div>
    );
  }
}

export default App;
