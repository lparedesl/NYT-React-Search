import _ from "lodash";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import {fetchSavedArticles} from '../actions';
import {deleteArticle} from '../actions';
import ArticlePanel from './article_panel';

class SavedArticles extends Component {
    constructor(props) {
        super(props);

        this.onArticleDelete = this.onArticleDelete.bind(this);
    }

    componentDidMount() {
        this.props.fetchSavedArticles();
    }

    onArticleDelete(id) {
        this.props.deleteArticle(id, (doc) => {
            if (doc.data) {
                toastr.options = {
                    closeButton    : true,
                    debug          : false,
                    positionClass  : "toast-bottom-right",
                    showDuration   : 1000,
                    hideDuration   : 1000,
                    timeOut        : 5000,
                    extendedTimeOut: 1000,
                    showEasing     : "swing",
                    hideEasing     : "linear",
                    showMethod     : "fadeIn",
                    hideMethod     : "fadeOut"
                };
                toastr['error'](`"${doc.data.topic}" was successfully deleted.`, 'Article Deleted');
            }
        });
    }

    renderArticles() {
        const {articles} = this.props;

        if (!articles) {
            return <div>Loading...</div>;
        }

        return _.map(articles, article => {
            return <ArticlePanel
                savedArticle={true}
                article={article}
                key={article._id}
                saved={article.saved}
                onArticleDelete={this.onArticleDelete}
            />;
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link className="card-link" to="/">Home</Link></li>
                        <li className="breadcrumb-item active">Saved Articles</li>
                    </ol>
                </div>
                <div className="row results-menu">
                    <div className="col-md-12 clearfix">
                        <h3 className="float-left">Saved Articles</h3>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-md-12">
                        <ul className="list-group">
                            {this.renderArticles()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {articles: state.savedArticles}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchSavedArticles,
        deleteArticle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedArticles);