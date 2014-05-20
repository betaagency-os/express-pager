var express = require('express'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs')

module.exports = function(options){
  var opts = {
    views: path.normalize(__dirname + '/../../views'), // assume we are in ./node_modules/express-pager
    directory: 'page',
    tplSuffix: '.jade',
    autoindex: false,
    hrefPrefix: '/page'
  }
  _.extend(opts, options)

  if(opts.dir){
    opts.directory = opts.dir;
    opts.hrefPrefix = '/'+opts.dir;
  }

  var router = express.Router();

  if(opts.autoindex){
    router.get('/', function(req, res, next){
      var str = '<h1>List of pages in <i>"' + opts.directory + '</i></h1>';
      fs.readdir(path.join(opts.views, opts.directory), function(err, files){
        if(err) 
          return next(err);
        files = files.map(function(file){
          file = path.basename(file, opts.tplSuffix);
          return '<a href="' + opts.hrefPrefix + '/' + file + '">' + file + '</a>';
        })
        res.send(files.join('<br>'));
      })
    })
  }

  router.get('/:page?', function(req,res){
    var page = 'index'
    if(req.params.page)
      page = req.params.page
    res.render(opts.directory + '/' + page);
  })

  return router;
}
