# Go + TypeScript Example

A sample Go binary with embedded TypeScript frontend using `go:embed`.

## Features

- TypeScript frontend compiled to JavaScript with Webpack
- Go server with embedded frontend assets
- Hot reload development with [air](github.com/air-verse/air)
- Single binary or Docker image deployment

## Development

```bash
make dev    # Start development server with hot reload
```

Changes to any file triggers a rebuild and reload, which takes ~3 seconds.

## Build & Run

```bash
make release  # Build standalone release binary (~7.7 MB)
./bin/gots    # Run binary

# Or run directly:
make run    # Generate assets and run

# Or build and push a multi-arch image
make image
```

The resulting image is ~5.3 MB

Server runs on http://localhost:8080
