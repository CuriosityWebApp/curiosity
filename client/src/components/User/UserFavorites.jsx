import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddTagsToFavorites, DeleteTagsFromFavorites } from '../../mutations/mutations.js';
class UserFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: ''
		};
		this.addToFavorites = this.addToFavorites.bind(this);
		this.displayTags = this.displayTags.bind(this);
		this.removeTag = this.removeTag.bind(this);
	}

	addToFavorites(e) {
		e.preventDefault();
		let { tag } = this.state;
		let tags = this.props.user.favoriteTags;
		if (tag.charAt(0) !== '#' || tags.includes(tag)) {
			alert('You have to put # in front of the tag name and it should not be duplicate!');
		} else {
			this.props
				.AddTagsToFavorites({
					mutation: AddTagsToFavorites,
					variables: {
						userId: this.props.user.id,
						tag: this.state.tag
					}
				})
				.then(() => {
					this.props.refetchTags();
				});
		}
	}

	removeTag(e, tag) {
		e.preventDefault();
		this.props
			.DeleteTagsFromFavorites({
				mutation: DeleteTagsFromFavorites,
				variables: {
					userId: this.props.user.id,
					tag: tag
				}
			})
			.then(() => {
				this.props.refetchTags();
			});
	}

	displayTags() {
		let tags = this.props.user.favoriteTags;
		if (!tags) {
			return <div> No tags yet added</div>;
		} else {
			return tags.map((tag, i) => {
				return (
					<div>
						<span key={i + 1} className="badge badge-info " style={{ margin: '2px' }}>
							{tag}
						</span>
						<button
							key={i}
							type="button"
							className="btn btn-danger btn-xs"
							style={{ margin: '1px' }}
							onClick={e => this.removeTag(e, tag)}
						>
							x
						</button>
					</div>
				);
			});
		}
	}
	render() {
		return (
			<div>
				<form>
					<label> Tag Name:</label>
					<input type="text" value={this.state.tag} onChange={e => this.setState({ tag: e.target.value })} />
					<button onClick={this.addToFavorites}>Add to favorites</button>
				</form>
				<div>
					<h3>Your favorite tags: </h3>
					<div>{this.displayTags()}</div>
				</div>
			</div>
		);
	}
}

export default compose(
	graphql(AddTagsToFavorites, { name: 'AddTagsToFavorites' }),
	graphql(DeleteTagsFromFavorites, { name: 'DeleteTagsFromFavorites' })
)(UserFavorites);
