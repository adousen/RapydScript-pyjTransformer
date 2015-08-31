//use baidu fis3 to compress .js files
//
fis.set('project.ignore',[
  '*.js', //bourbon
  'output/**'
]);

fis.match('lib/*.js', {
  deploy: fis.plugin('local-deliver', {
    to: 'output/'
  }),
  packTo: 'rapydscript.min.js',
});

fis.match('lib/*.js', {
  optimizer: fis.plugin('uglify-js'),
  useHash: false,
});


