import _ from 'lodash'
import {
    CREATE_EVENTS,
    READ_EVENT,
    READ_EVENTS,
    UPDATE_EVENTS,
    DELETE_EVENTS,
} from  '../actions'

export default (events = {}, action) => {
    switch(action.type) {
        case READ_EVENT:
        case CREATE_EVENTS:
        case UPDATE_EVENTS:
            const data = action.response.data
            return {...events,[data.id]: data}
        case READ_EVENTS:
            return _.mapKeys(action.response.data, 'id')
        case DELETE_EVENTS:
            delete events[action.id]
            return {...events}
        default:
            return events
    }
}