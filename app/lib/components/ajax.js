import React from 'react'
import $ from 'jquery'

class AjaxPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: null }
  }

  componentWillMount () {
    this.props.ajax.done((data) => this.setState({ data }))
  }

  render () {
    const { props, state } = this
    const Init = props.init
    const View = props.view

    if (state.status === null) {
      return Init ? <Init /> : null
    } else {
      return <View data={state.data} />
    }
  }
}
export default AjaxPage

const AjaxHTMLPage = (props) => (
  <AjaxPage ajax={$.get(props.url)} {...props} />
)
export { AjaxHTMLPage }
