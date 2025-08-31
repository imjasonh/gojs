.PHONY: generate build run dev clean install-air

KO_DOCKER_REPO?=ttl.sh/jason

# Generate frontend assets
generate:
	go generate ./...

# Build the Go binary
build: generate
	go build -o gojs .

# Run the server (regenerates assets first)
run: generate
	go run . -port=8080

# Development mode - watch for changes and auto-reload
dev:
	go tool air

image:
	KO_DOCKER_REPO=$(KO_DOCKER_REPO) ko build

# Clean generated files
clean:
	rm -rf assets/ frontend/node_modules/ frontend/package-lock.json gojs
