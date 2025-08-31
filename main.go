package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"runtime/debug"
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
	fmt.Printf("Version: %s\n", version())
	fmt.Printf("Binary size: %d bytes\n", binarySize())
	fmt.Printf("Embedded assets size: %d bytes\n", assetsSize())
	fmt.Printf("Server starting on http://localhost%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func version() string {
	bi, ok := debug.ReadBuildInfo()
	if !ok {
		return "devel"
	}
	return bi.Main.Version
}

func binarySize() int64 {
	info, err := os.Stat(os.Args[0])
	if err != nil {
		log.Fatal(err)
	}
	return info.Size()
}

func assetsSize() int64 {
	var total int64
	if err := fs.WalkDir(assets, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			info, err := d.Info()
			if err != nil {
				return err
			}
			total += info.Size()
		}
		return nil
	}); err != nil {
		log.Fatal(err)
	}
	return total
}
