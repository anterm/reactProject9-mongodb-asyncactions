// полифил для серверной части
if(typeof require.ensure !== 'function') 
	require.ensure = (d, c) => c(require)
  
module.exports = {
  path: "/",
  component: require('./components/App').default,
  
  getIndexRoute(location, callback) {
    require.ensure([], require => {
      callback(null, {
        component: require('./components/main/Main').default,
      })
    }, 'main')
  },
  
  childRoutes: [
    {
      path: 'books',
      getComponent(location, cb) {
        require.ensure([], require => {
          cb(null, require('./components/books/Books').default)
        }, 'books')
      }
    },
    {
      path: 'about',
      getComponent(location, cb) {
        require.ensure([], require => {
          cb(null, require('./components/about/About').default)
        }, 'about')
      }
    }
  ]
}