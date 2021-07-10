import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import styles from "./Tables.module.css";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myResult: [],
      summary: [],
      hideData: false,
      viewopen: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  handleViewOpen = () => {
    this.setState({ viewopen: true });
  };
  handleHideData = () => {
    this.setState({ myResult: [] });
    this.setState({ hideData: true });
  };
  handleViewClose = () => {
    this.setState({ viewopen: false });
  };

  getData = () => {
    let data = fetch(`https://api.rootnet.in/covid19-in/stats/latest`);
    data
      .then((respone) => {
        return respone.json();
      })
      .then((result) => {
        console.log(result.data.regional);
        this.setState({ myResult: result.data.regional });
        this.setState({ summary: result.data.summary });
      });
  };

  render() {
    const headerTextColor = { color: "white", fontSize: 14 };
    return (
      <div className={styles.container}>
        <div className={styles.buttonStyle}>
          <Button
            onClick={this.handleViewOpen}
            style={{ backgroundColor: "black", color: "white", width: "130px" }}
          >
            India
          </Button>
        </div>

        <Dialog style={{ minWidth: 800 }} open={this.state.viewopen}>
          <DialogContent>
            <TableContainer className={styles.tablecontainer}>
              <Table className={styles.tablecontainer}>
                <TableHead
                  className={styles.tablecontainer}
                  style={{ backgroundColor: "grey" }}
                >
                  <TableRow>
                    <TableCell style={headerTextColor}>NAME</TableCell>
                    <TableCell style={headerTextColor}>CONFIRMED</TableCell>
                    <TableCell style={headerTextColor}>RECOVERED</TableCell>
                    <TableCell style={headerTextColor}>DEATH</TableCell>
                    <TableCell style={headerTextColor}>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.myResult.map((data) => (
                    <TableRow>
                      <TableCell
                        style={{
                          color: "#00000",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {data.loc}
                      </TableCell>
                      <TableCell style={{ color: "#006699", fontSize: 16 }}>
                        {data.confirmedCasesIndian}{" "}
                      </TableCell>
                      <TableCell style={{ color: "green", fontSize: 16 }}>
                        {data.discharged}
                      </TableCell>
                      <TableCell style={{ color: "#ff1a1a", fontSize: 16 }}>
                        {data.deaths}
                      </TableCell>
                      <TableCell style={{ fontSize: 16 }}>
                        {data.totalConfirmed}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "#00000",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Total
                    </TableCell>
                    <TableCell>
                      {this.state.summary.confirmedCasesIndian}
                    </TableCell>
                    <TableCell>{this.state.summary.discharged}</TableCell>
                    <TableCell>{this.state.summary.deaths}</TableCell>
                    <TableCell>{this.state.summary.total}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleViewClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Tables;
