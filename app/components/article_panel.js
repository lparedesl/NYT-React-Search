import React, {Component} from 'react';

class ArticlePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                                <button type="button" className="btn btn-primary" onClick={() => this.onSave(article)}>
                                    {this.state.buttonTxt}
                                </button>
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