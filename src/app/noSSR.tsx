import dynamic from 'next/dynamic'
import React from 'react'

const NoSSRWrapper = (props: { children: React.ReactNode }): React.JSX.Element => <React.Fragment>{props.children}</React.Fragment>
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
})
