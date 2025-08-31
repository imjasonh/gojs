package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
)

//go:embed assets/*
var assets embed.FS

func main() {
	port := flag.Int("port", 8080, "port to serve on")
	flag.Parse()

	assetsFS, err := fs.Sub(assets, "assets")
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", http.FileServer(http.FS(assetsFS)))

	addr := fmt.Sprintf(":%d", *port)
	fmt.Printf("Server starting on http://localhost%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
