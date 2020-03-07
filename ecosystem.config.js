module.exports = {
  deploy : {
    production : {
      user : 'pm2',
      host : '209.97.134.66',
      ref  : 'origin/master',
      repo : 'git@github.com:Squiff-cmd/SEB-Client.git',
      path : '~/seb-client',
      'post-deploy' : 'npm install; npm run build'
    }
  }
};
