import React from 'react'
import about from '../pages/about'

export const About = () => (
  <div className="container" dangerouslySetInnerHTML={{ __html: about }}>
  </div>
)

export default About
