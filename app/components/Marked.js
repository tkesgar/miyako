import React from 'react'
import marked from 'marked'

const md = content => marked(content, {
  breaks: true,
  sanitize: true,
  smartypants: true
})

export default (props) => (
  <div {...props} dangerouslySetInnerHTML={{ __html: md(props.content) }} />
)
