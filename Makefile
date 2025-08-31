.PHONY: generate generate-dev generate-prod build run dev clean install-air

KO_DOCKER_REPO?=ttl.sh/jason

# Generate frontend assets (development mode)
generate-dev:
	go generate ./frontend/generate_dev.go

# Generate frontend assets (production mode)
generate-prod:
	go generate ./frontend/generate_prod.go

# Build the Go binary (production)
release: generate-prod
	go build -o bin/gojs .

# Run the server (regenerates assets first)
run: generate-dev
	go run . -port=8080

# Development mode - watch for changes and auto-reload
dev:
	go tool air

image: generate-prod
	KO_DOCKER_REPO=$(KO_DOCKER_REPO) ko build -P --sbom=none

# Clean generated files
clean:
	rm -rf assets/ frontend/node_modules/ frontend/package-lock.json gojs
