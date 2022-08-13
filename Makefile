pushServer:
	@echo "Building server"
	npm --prefix ./ui run-script build
	@echo "Uploading to server"
	scp -r -i sshKey ui/build/* finnwjones@34.151.64.125:/var/www/votencrypt.com
	@echo "Finished pushing to server"

