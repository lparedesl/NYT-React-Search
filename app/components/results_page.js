import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import {fetchArticles} from '../actions';
import {saveArticle} from '../actions';
import ArticlePanel from './article_panel';

class ArticleResults extends Component {
    constructor(props) {
        super(props);

        this.onArticleSave = this.onArticleSave.bind(this);
    }

    componentDidMount() {
        if (this.props.search_values.topic) {
            this.props.fetchArticles(this.props.search_values);
        }
    }

    onArticleSave(values) {
        this.props.saveArticle(values, (doc) => {
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
                toastr['success'](`"${doc.data.topic}" was successfully saved.`, 'Article Saved');
            }
        });
    }

    renderArticles() {
        const {articles} = this.props;

        if (!articles) {
            return <div>Loading...</div>;
        }

        return _.map(articles, article => {
            var articleObj = {
                _id  : article._id,
                topic: article.headline.main,
                date : article.pub_date,
                url  : article.web_url
            };

            return <ArticlePanel
                fetchedArticle={true}
                article={articleObj}
                buttonTxt={article.saved ? 'Saved' : 'Save'}
                key={article._id}
                saved={article.saved}
                onArticleSave={this.onArticleSave}
            />;
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link className="card-link" to="/">Home</Link></li>
                        <li className="breadcrumb-item active">Results</li>
                    </ol>
                </div>
                <div className="row results-menu">
                    <div className="col-md-12 clearfix">
                        <Link className="btn btn-primary float-right" to="/saved">Go to Saved Articles</Link>
                        <h3 className="float-left">Articles</h3>
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
    return {
        search_values: state.search_values,
        articles     : state.articles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchArticles,
        saveArticle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleResults);