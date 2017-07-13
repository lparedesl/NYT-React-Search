import React, {Component} from 'react';

class ArticlePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleted: false,
            saved: this.props.saved,
            buttonTxt: this.props.buttonTxt
        };
    }

    onSave(values) {
        this.setState({
            saved: true,
            buttonTxt: 'Saved'
        });
        this.props.onArticleSave(values);
    }

    onDelete(id) {
        this.setState({
            deleted: true
        });
        this.props.onArticleDelete(id);
    }

    renderBtn(article) {
        if (this.props.fetchedArticle) {
            return (
                <button type="button" className="btn btn-primary" disabled={this.state.saved} onClick={() => this.onSave(article)}>
                    {this.state.buttonTxt}
                </button>
            )
        } else if (this.props.savedArticle) {
            return (
                <button type="button" className="btn btn-danger" onClick={() => this.onDelete(article._id)}>
                    Delete
                </button>
            )
        }
    }

    render() {
        const {article} = this.props;

        if (!this.state.deleted) {
            return (
                <div className="card">
                    <div className="card-block">
                        <div className="row">
                            <div className="col-md-10">
                                <h4 className="card-title">{article.topic}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">{article.date}</h6>
                                <p className="card-text">
                                    Link: <a className="card-link" href={article.url}
                                             target="_blank">{article.url}</a>
                                </p>
                            </div>
                            <div className="col-md-2">
                                {this.renderBtn(article)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default ArticlePanel;