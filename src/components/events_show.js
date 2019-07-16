import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField'
import {getEvent, deleteEvents, putEvents} from '../actions'

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  renderfield(field) {
    const {input, label, type, meta: {touched,error}} = field

    return(
      <TextField
      hintText={label}
      floatingLabelText={label}
      type={type}
      errorText={touched && error}
      {...input}
      fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const {id} = this.props.match.params
    await this.props.deleteEvents(id)
    this.props.history.push(`/`)
  }

  async onSubmit(values) {
    await this.props.putEvents(values)
    this.props.history.push('/')
  }

  render(){
    const { handleSubmit, pristine, submitting, invalid} = this.props
    const style = {margin: 12}
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderfield} /></div>
          <div><Field label="Body" name="body" type="text" component={this.renderfield} /></div>

          <div>
          <RaisedButton label="submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
          <RaisedButton label="Delete" style={style} onClick={this.onClick}/>
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

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event}
}
const mapDispatchToProps = ({ deleteEvents, getEvent, putEvents })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({validate, form: `eventShowForm`, enableReinitialize: true})(EventsShow)
  )