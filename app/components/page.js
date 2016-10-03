import React from 'react'
import about from '../pages/about'

const Page = ({ content }) => (
  <div className="container" dangerouslySetInnerHTML={{ __html: content }} />
)

export const About = () => <Page content={ about } />
