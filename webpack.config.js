module.exports = {
	//...
	devServer: {
	  proxy: {
		'/api': {
		  target: 'http://test-rest-api',
		  secure: false,
		},
	  },
	},
  };