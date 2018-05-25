import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

class CustomCalendar extends Component {
  handleChange = (date, str) => {
    const { onChange } = this.props
    
    if (onChange) {
      onChange(date)
    }
  }

  disabledDate = (date) => {
    const { option } = this.props

    if (moment().isSame(date, 'days')) return false
    if (option && option(date) && date && moment().isAfter(date)) {
      return true
    }
    return date && moment().isAfter(date)
  }

  render() {
    const { size, value } = this.props

    return (
      <DatePicker 
        value={value}
        size={size}
        onChange={this.handleChange} 
        disabledDate={this.disabledDate}
        onCalendarChange={this.handleChange} 
      />
    )
  }
}

export default CustomCalendar