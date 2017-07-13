import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {setSearchValues} from '../actions';

class ArticleSearch extends Component {
    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.setSearchValues(values);
        this.props.history.push('/results');
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <div className="row">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Home</li>
                    </ol>
                </div>
                <div className="row results-menu">
                    <div className="col-md-12 clearfix">
                        <Link className="btn btn-primary float-right" to="/saved">Go to Saved Articles</Link>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Topic"
                                name="topic"
                                component={this.renderField}
                            />
                            <Field
                                label="Start Year"
                                name="start_year"
                                component={this.renderField}
                            />
                            <Field
                                label="End Year"
                                name="end_year"
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link className="btn btn-danger" to="/">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.topic) errors.topic = 'Enter a topic';
    if (!values.start_year) errors.start_year = 'Enter a start year';
    if (!values.end_year) errors.end_year = 'Enter an end year';
    if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

    return errors;
}

export default reduxForm({
    validate,
    form: 'ArticleSearchForm'
})(
    connect(null, {setSearchValues})(ArticleSearch)
);