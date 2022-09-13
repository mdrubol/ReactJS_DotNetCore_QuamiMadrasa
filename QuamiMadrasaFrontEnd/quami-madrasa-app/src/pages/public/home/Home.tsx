import React,{Component} from "react";
import Banner from "../../../components/banner/Banner";
import UserService from "../../../services/user.service";

export default class Home extends React.Component<any,any> {

  constructor(props:any) {
    super(props);
    this.state = {
      content: ""
    };
  }
  
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render(){
    return (
      <>
        <Banner />
        <div className="container py-3">
          <h1 className="page-title">Home</h1>
          <p className="lead">
            {this.state.content}
          </p>
        </div>
      </>
    );
  }

}
