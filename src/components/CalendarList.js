import React from 'react';

class CalendarList extends React.Component {   
    render() {
        return <ul>{ this.renderMeetingsList() }</ul>
    }

    renderMeetingsList() {
        return this.props.meetings.map(item => 
            this.renderMeetingsItem(item)
        );
    }

    renderMeetingsItem(itemData) {
        return (
            <li key={itemData.id}>
                {itemData.date} {itemData.time} => 
                <a href={`mailto: ${itemData.email}`}>
                    {itemData.firstName} {itemData.lastName}
                </a>
            </li>
        )
    }
}

export default CalendarList