import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

class SignIn extends Component {
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;
    if (!cpf || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/signin", { cpf, password });
        console.log('TOKEN RECEBIDO:', response.data.token)
        login(response.data.token);
        this.props.history.push("/main");
      } catch (err) {
        
        this.setState({
          error:err.response.data.error
        })
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          {/* <img src={Logo} alt="Airbnb logo" /> */}
          {this.state.error && <p>{this.state.error}</p>}
          <input
            placeholder="CPF"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);