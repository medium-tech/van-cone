import van from 'vanjs-core'
const { div } = van.tags

const nonDefaultFunctionPage = () => div('Non Default Function Page')
const nonDefaultElementPage = div('Non Default Element Page')
const nonDefaultStringPage = '<div>Non Default String Page</div>'
const defaultPage = () => div('Default Export Page')

export default defaultPage
export { nonDefaultFunctionPage, nonDefaultElementPage, nonDefaultStringPage }
