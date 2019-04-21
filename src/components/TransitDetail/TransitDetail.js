import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Transit} from "../../entities/Transit";

const tt_names = ['ALL', 'MARTA', 'Bike', 'Bus'];
var siteName = "Inman Park";
const date = new Date().getDate();
const transits = [new Transit("Blue", "MARTA", 2.5, 5), new Transit("Red", "MARTA", 2.5, 3)];

export class TransitDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staff: [1,2,3,4,5],
            selected: null,
            anchorEl: null,
            tt: 'ALL',
            transitDate: {date}
        }
    }

    handleTransitDate = (event) => {
        this.setState({transitDate: event.target.value});
        console.log("Changed the date!")
    }

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    handleTTClick = event => {
        this.setState({ anchorEl: event.currentTarget});
    };

    handleTTOptionClick = event => {
        this.setState({
            anchorEl: null,
            tt: event.target.innerText
        })
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>Transit Detail</h1>
                    </Grid>
                </Grid>

                {/*container for the first name and the last name*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '35px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Site: {siteName}</InputLabel>
                    </Grid>

                    <Grid item>
                        <InputLabel>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl ? 'tt_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTTClick}> {this.state.tt} </Button>
                        <Menu
                            id="tt_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {tt_names.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleTTOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*container for the filter button*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '30px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Transit Date</InputLabel>
                        <TextField id="transitdate"
                                   type="date"
                                   defaultValue={date}
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleTransitDate}/>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained">Log Transit</Button>
                    </Grid>
                </Grid>

                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Route</TableCell>
                                    <TableCell align="right">Transport Type</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">No. of Connected Sites</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transits.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.route}</TableCell>
                                        <TableCell align="right">{transit.type}</TableCell>
                                        <TableCell align="right">{transit.price}</TableCell>
                                        <TableCell align="right">{transit.connected_sites}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                {/*container for the back button*/}
                <Grid style={{marginTop: '40px'}} container justify="center">
                    <Grid item>
                        <Button style={{width: '100px'}} color="primary" variant="contained">Back</Button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}