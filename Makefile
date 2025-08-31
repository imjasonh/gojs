.PHONY: generate build run dev clean

# Generate frontend assets
generate:
	go generate ./...

# Build the Go binary
build: generate
	go build -o gojs .

# Run the server (regenerates assets first)
run: generate
	go run . -port=8080

# Development mode - watch for changes
dev: generate
	go run . -port=8080

# Clean generated files
clean:
	rm -rf assets/ frontend/node_modules/ frontend/package-lock.json gojs