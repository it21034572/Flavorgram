import React, { Component } from "react";
import "./NavBar.css";
import { Grid } from "@material-ui/core";
import app_logo from "../../images/Flavorgram.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import Avatar from "@material-ui/core/Avatar";
import pp from "../../images/pp1.png";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="navbar_barContent">
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <img className="navbar_logo" src={app_logo} width="220px" />
            </Grid>
            <Grid item xs={3}>
              <input
                text="text"
                className="navbar_seacrhBar"
                placeholder="search"
              />
            </Grid>
            <Grid item xs={3} style={{ display: "flex" }}>
              <img className="navbar_img" src={home} width="30px" />
              <img className="navbar_img" src={message} width="30px" />
              <img className="navbar_img" src={find} width="30px" />
              <img className="navbar_img" src={react} width="30px" />
              <Avatar
                src={pp}
                className="navbar_img"
                style={{ maxWidth: "25px", maxHeight: "25px" }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default NavBar;
