import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import { Button, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import styles from './Tables.module.css';

 class Tables extends Component {

  constructor (props) {
    super(props);
    this.state = {
      myResult:[],
      hideData:false,
      viewopen:false,
      finaltotal : '',
      totalconfirmed : '',
      totalcure : '',
      totaldeaths : '',

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

            let sortedProducts = [...this.state.myResult];

            sortedProducts.sort((a,b) =>{
              if (a.total > b.total) {
                return -1;
              }
              if (a.total < b.total) {
                return 1;
              }
              this.setState({myResult:sortedProducts});
            });

            let a = [...this.state.myResult];
            
            var totalvalue = 0;
            var confirmedtotal = 0;
            var cure = 0;
            var deaths = 0;
            
            for (var i=0; i<a.length; i++) {
              totalvalue += a[i].total;
              confirmedtotal += a[i].confirmed;
              cure += a[i].cured;
              deaths += a[i].death;
              
              this.setState({finaltotal:totalvalue,totalconfirmed:confirmedtotal,
                totalcure:cure,totaldeaths:deaths
              })
            }
            // console.log('total', totalvalue)
            // console.log('confirm', confirmedtotal)
            // console.log('cure', cure)
            // console.log('deaths', deaths)
           
    })
  }

  // var numbers = [955,2694,3313,35546,255,68,5435];
  // var sum = numbers.reduce(myFunction(total, value, index, array) {
  //   return total + value;
  // });

  // document.getElementById("demo").innerHTML = "The sum is " + sum;

  // function myFunction(total, value, index, array) {
  //   return total + value;
  // }
       
  render() {
    // if(!this.state.myResult) {
    //   return null;
    //   console.log('lowding....')
    // } else {
      
      const headerTextColor = {color:'white',fontSize:14};
      return (
      
     
       

     <div className={styles.container}>

         <Button onClick={this.handleViewOpen} style={{backgroundColor:'gray',color:'white'}}>
            India
        </Button>  open={this.state.viewopen} 
       <Dialog style={{ minWidth:800}}>
        <DialogContent> 
       
        <TableContainer className={styles.tablecontainer}>
           <Table className={styles.tablecontainer}>
             <TableHead className={styles.tablecontainer} style={{ backgroundColor: 'grey'}}>
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
                  <TableCell style={{ color:"#006699",fontSize:16}}>{data.confirmed} </TableCell>
                  <TableCell style={{color:'green',fontSize:16}}>{data.cured}</TableCell>
                  <TableCell style={{ color:'#ff1a1a',fontSize:16}}>{data.death}</TableCell>
                  <TableCell style={{fontSize:16}}>{data.total}</TableCell>
                </TableRow>
                 ))
               }
             </TableBody>
             <TableHead>
               <TableRow>
                 <TableCell style={{ color:'#00000', fontWeight:'bold',fontSize:16}}>Total</TableCell>
                 <TableCell >{this.state.totalconfirmed}</TableCell>
                 <TableCell >{this.state.totalcure}</TableCell>
                 <TableCell >{this.state.totaldeaths}</TableCell>
                 <TableCell >{this.state.finaltotal}</TableCell>

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
