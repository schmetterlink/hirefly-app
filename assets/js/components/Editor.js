import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import NestedList from "../classes/NestedList";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Network from "../classes/Network";

function getModalStyle() {
    const top = 25;
    const left = 40;

    return {
        position: `fixed`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});


class EditorNaked extends React.Component {
    constructor(props) {
        super(props);
        this.childkey = 0;
        this.state = {
            open: false,
            data: undefined
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };
    handleChange(e) {
        this.state.data[e.target.name] = e.target.value;
    }

    toggle() {
        this.setState({open: !this.state.open});
    }

    setData(data) {
        console.debug(data);
        this.setState({data: data});
    }
    getFields(data = undefined) {
        if (data === undefined) {
            data = this.state.data;
        }
        let tableRows = [];
        console.debug("creating input fields for data");
        console.debug(data);
        for (let row in data) {
            let cname = "field-row-" + row;
            tableRows.push(
                <TableRow key={cname}>
                    <TableCell>{row}</TableCell>
                    <TableCell>
                        <input name={row} type={"text"} defaultValue={data[row]} onChange={this.handleChange.bind(this)} />
                    </TableCell>
                </TableRow>);
        }
        return tableRows
    }
    submitData(event) {
        event.preventDefault();
        console.debug("submitting data fields");
        if (this.props.submitCallback) {
            this.props.submitCallback(this.state.data, this.props.entity, event);
        }

    }
    resetData(event) {
        console.debug("resetting data fields");

    }

    render() {
        ++this.childkey;
        const {classes} = this.props;
        return (
            this.state.open ? (
                    <div style={getModalStyle()} className={classes.paper} key={"editor-"+this.childkey}>
                        <form id={"edit-"+this.props.entity+"-"+this.state.data.id} method="PUT" onSubmit={this.submitData.bind(this)}>
                        <Table>
                            <TableHead><TableRow><TableCell>Editor</TableCell></TableRow></TableHead>
                            <TableBody>
                                    {this.getFields()}
                            </TableBody>
                        </Table>
                            <Button type="submit" variant="contained" color="primary">save</Button>
                            <Button variant="contained" color="primary" onClick={this.resetData.bind(this)}>reset</Button>
                            <Button variant="contained" color="secondary" onClick={this.handleClose.bind(this)}>X</Button>
                        </form>
                        <div>{/* new NestedList().renderData("data", this.state.data) */}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )

        );
    }
}

EditorNaked.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const Editor = withStyles(styles)(EditorNaked);

export default Editor;