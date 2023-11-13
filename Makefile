run: 
	docker run -d -p 8080:8080 --rm --name test-container test-app
stop:
	docker stop test-container