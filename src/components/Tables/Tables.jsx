import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import styles from './Tables.module.css';

 class Tables extends Component {

  constructor (props) {
    super(props);
    this.state = {
      myResult:[],
      hideData:false,
      viewopen:false
    };
  }

componentDidMount(){
  this.getData();
}

 handleViewOpen = () => {
  this.setState({viewopen:true});
}
handleHideData = () => {
  this.setState({myResult:[]});
  this.setState({hideData:true});
}
handleViewClose = () => {
  this.setState({viewopen:false});
}

getData = () => {
    let data = fetch(`http://covid19-india-adhikansh.herokuapp.com/states`);
        data.then(respone => {
          return respone.json();
            }).then(result => {
            this.setState({myResult:result.state});
    })
  }
       
  render() {
    const headerTextColor = {color:'white',fontSize:14};
    return (
      <div className={styles.container}>

        <Button onClick={this.handleViewOpen} style={{backgroundColor:'gray',color:'white'}}>
            India
        </Button>
      <Dialog  open={this.state.viewopen} 
      style={{ minWidth:800}}
      >
        <DialogContent>
       
        <TableContainer>
           <Table>
             <TableHead style={{ backgroundColor: 'grey'}}>
               <TableRow>
                 <TableCell style={headerTextColor}>NAME</TableCell>
                 <TableCell style={headerTextColor}>CONFIRMED</TableCell>
                 <TableCell style={headerTextColor}>RECOVERED</TableCell>
                 <TableCell style={headerTextColor}>DEATH</TableCell>
                 <TableCell style={headerTextColor}>TOTAL</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>

             {this.state.myResult.map(data => (
               <TableRow>
                  <TableCell style={{ color:'#00000', fontWeight:'bold',fontSize:16}}>{data.name}</TableCell>
                  <TableCell style={{ color:"#006699",fontSize:16}}>{data.confirmed}</TableCell>
                  <TableCell style={{color:'green',fontSize:16}}>{data.cured}</TableCell>
                  <TableCell style={{ color:'#ff1a1a',fontSize:16}}>{data.death}</TableCell>
                  <TableCell style={{fontSize:16}}>{data.total}</TableCell>
                </TableRow>
                 ))
               }
             </TableBody>
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