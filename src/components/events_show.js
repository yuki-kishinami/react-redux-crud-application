import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'

import {getEvents, deleteEvents, putEvents} from '../actions'

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  renderfield(field) {
    const {input, label, type, meta: {touched,error}} = field

    return(
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
    )
  }

  async onDeleteClick() {
    const {id} = this.props.match.params
    await this.props.deleteEvents(id)
    this.props.history.push(`/`)
  }

  async onSubmit(values) {
    // await this.props.postEvents(values)
    this.props.history.push('/')
  }

  render(){
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderfield} /></div>
          <div><Field label="Body" name="body" type="text" component={this.renderfield} /></div>

          <div>
            <input type="submit" value="submit" disabled={pristine || submitting} />
            <Link to="/">Cancel</Link>
            <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
          </div>
      </form>
    )
  }
}



const validate = values => {
  const errors = {}

  if(!values.title) errors.title = "Enter a title, please"
  if(!values.body) errors.body = "Enter a body, please"

  return errors
}

const mapDispatchToProps = ({ deleteEvents })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowform'})(EventsShow)
  )