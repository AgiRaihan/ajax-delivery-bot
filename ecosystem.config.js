module.exports = {
  apps: [
    {
      name: 'ajax-whatsapp-bot',
      script: './wa_bot/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000
    }
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'your_server_ip',
      ref: 'origin/main',
      repo: 'git repository',
      path: '/var/www/ajax-bot',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': ''
    }
  }
};
