import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import FormLabel from '@material-ui/core/FormLabel';
import {SiteDetailObject} from "../../entities/SiteDetailObject";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const date = new Date().getDate();
var testSite = [new SiteDetailObject("Inman Park", "Yes", "Inman Park, Atlanta, GA 30307")];

export class SiteDetail extends Component {
    hr = new XMLHttpRequest();
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            open: '',
            visitDate: ''
        }
    }

    componentDidMount() {
        const url = 'http://localhost:5000/v_site_detail?site_name=' + this.props.location.state.site_name;

        this.hr.open('GET', url);

        this.hr.onreadystatechange = (event) => {
            {/* Stage 4 is ready state, status 200 is ready status */}
            if (event.target.readyState === 4 && event.target.status === 200) {
                {/*Response Text is data from backend*/}
                const data = JSON.parse(event.target.responseText);

                this.setState({
                    address: data[0].address,
                    open: data[0].open
                });
            }
        };

        this.hr.send();
    }

    handleDateChange = (event) => {
        this.setState({visitDate: event.target.value});
        console.log("Changed date to " + event.target.value);
    }

    handleLogVisit = (event) => {
        const body = {
            'date' : this.state.visitDate,
            'username': this.props.location.state.username,
            'site_name': this.props.location.state.site_name
        };
        this.hr.open('POST', 'http://localhost:5000/v_site_detail');
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                console.log('log sucess');
            }
        };
        this.hr.send(JSON.stringify(body));
    };

    handleGoBack = (event) => {
        let pathname = "/explore_site";
        this.props.history.push(pathname);
    }


    render() {
        return (
            <div>
                {/*Container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Site Detail</h1>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item>
                        <TableHead>
                            <TableCell align="right">Site</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Open Every Day</TableCell>
                        </TableHead>
                        <TableBody>
                            {testSite.map((detail, i) => {
                                return (<TableRow hover
                                                  key={i}>
                                    <TableCell align="right">{this.props.location.state.site_name}</TableCell>
                                    <TableCell align="right">{this.state.address}</TableCell>
                                    <TableCell align="right">{this.state.open}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '25px'}}>
                    <Grid item>
                        <InputLabel style={{paddingRight: '10px', marginTop: '50px'}}>Start Date</InputLabel>
                        <TextField id="visitdate"
                                   type="date"
                                   defaultValue={date}
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleDateChange}/>
                    </Grid>

                    <Grid item>
                        <Button style={{marginLeft: '25px'}}color='primary' variant='contained' onClick= {this.handleLogVisit}>Log Visit</Button>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '25px'}}>
                    <Button color={'primary'} variant='contained' onClick = {this.handleGoBack}>Back</Button>
                </Grid>
            </div>
        )
    }
}