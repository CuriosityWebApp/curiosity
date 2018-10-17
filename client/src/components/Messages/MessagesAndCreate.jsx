import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import { withApollo } from 'react-apollo';
import InboxList from './InboxList.jsx';
import NewList from './NewList.jsx';
import SentList from './SentList.jsx';
import PrivateMessage from '../Messages/PrivateMessage.jsx';

class MessagesAndCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      receivername: '',
      title: '',
      content: '',
    };
    this.onClickShowComponent = this.onClickShowComponent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
  }

  onClickShowComponent() {
    this.setState({
      showComponent: true,
    });
  }

  handleClose() {
    this.setState({ showComponent: false });
  }

  replyFormat(receiverName, title, content) {
    this.setState({
      receiverName: receiverName,
      title: title,
      content: content,
      showComponent: true,
    });
  }

  render() {
    const { showComponent } = this.state;
    const { folder, notify, userId } = this.props;
    return (
      <div>
        {showComponent && (
          <PrivateMessage
            userId={userId}
            notify={this.props.notify}
            showComponent={this.state.showComponent}
            handleClose={this.handleClose}
            receiverName={this.state.receiverName}
            content={this.state.content}
            title={this.state.title}
          />
        )}
        {folder === 'unread' && (
          <NewList userId={userId} replyFormat={this.replyFormat} notify={notify} />
        )}
        {folder === 'inbox' && (
          <InboxList userId={userId} replyFormat={this.replyFormat} notify={notify} />
        )}
        {folder === 'sent' && (
          <SentList userId={userId} replyFormat={this.replyFormat} notify={notify} />
        )}
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(AddMessage),
)(MessagesAndCreate);
