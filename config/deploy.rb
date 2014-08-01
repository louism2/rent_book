require "rvm/capistrano"
require "bundler/capistrano"

# config valid only for Capistrano 3.1
# lock '3.2.1'

set :deploy_to, "/var/www"
set :whenever_command, "bundle exec whenever"
server "ec2-54-235-215-158.compute-1.amazonaws.com", roles: [:app, :web, :db]
ssh_options[:keys] = ["/Users/louism2/documents/louies_stuff/TestKey.pem"]
 
 # if you want to clean up old releases on each deploy uncomment this
set :keep_releases, 2
after "deploy:restart", "deploy:cleanup"

#If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

# desc "exporting process handling to upstart"
# task :export_process_handling do
#   run "cd #{current_path} && rvmsudo bundle exec foreman export --user ec2-user upstart /etc/init && sudo restart app"
# end

# Prompts for password before deploy to produciton sever
before "deploy", "check_production"

desc "check production task"
task :check_production do
    puts " \n Are you REALLY sure you want to deploy to production?"
    puts " \n Enter the password to continue\n "
    password = STDIN.gets[0..7] rescue nil
    if password != 'music123'
      puts "\n !!! WRONG PASSWORD !!!"
      exit
    end
end
