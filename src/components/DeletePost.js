import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class DeletPost extends Component {
    onDelete = () => {
        this.props.onDeletePost(this.props.post);
        this.props.isDeleteClose();
    }
    render() {
        const deleteActions = [
            <FlatButton label="Cancel" primary labelStyle={{ fontWeight: 'bold'}} onClick={this.props.isDeleteClose} />,
            <FlatButton label="Delete" primary labelStyle={{ fontWeight: 'bold'}} onClick={this.onDelete} />
        ];
        return (
            <Dialog
                contentStyle={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: 500
                }}
                actions={deleteActions}
                open={this.props.isDeleteOpen}
                onRequestClose={() => this.props.isDeleteClose()}
            >
                Do you want to delete this post?
            </Dialog>
        )
    }
}
