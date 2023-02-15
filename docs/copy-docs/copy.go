package main

import (
	"fmt"
	"os"
	"strings"
)

// Корневая папка всего проекта относительно расположения скрипта
const rootFolder = "../../"

// Функция, которая прочитает директорию и выдаст список
// поддиректорий.
func getSliceOfDirNames(dir string) []string {
	files, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println(fmt.Errorf("Не могу прочитать директорию, ошибка: %v", err.Error()))
		os.Exit(1)
	}
	res := []string{}
	for _, file := range files {
		if file.IsDir() {
			res = append(res, file.Name())
		}
	}
	return res
}

// Функция отфильтрует только корневые папки для языков
func returnOnlyLanguages(dirs []string) []string {
	excludeDirsPrefixes := []string{"docs", "."}
	res := []string{}
Loop:
	for _, dir := range dirs {
		for _, exclude := range excludeDirsPrefixes {
			if strings.HasPrefix(dir, exclude) {
				continue Loop
			}
		}
		res = append(res, dir)
	}
	return res
}

// Функция отфильтрует только папки с паттернами
func returnOnlyFoldersWithPatterns(dirs []string) []string {
	const folderWhichContainsPatternsLabel = "patterns"
	res := []string{}
	for _, dir := range dirs {
		if !strings.Contains(dir, folderWhichContainsPatternsLabel) {
			continue
		}
		res = append(res, dir)
	}
	return res
}

func assemblePathsToPatterns(prefix string, res []string) []string {
	res = append(res, returnOnlyFoldersWithPatterns(getSliceOfDirNames(prefix))...)
	for i, path := range res {
		realPath := prefix + "/" + path
		morePatternFolders := returnOnlyFoldersWithPatterns(getSliceOfDirNames(realPath))
		if len(morePatternFolders) > 0 {
			res = assemblePathsToPatterns(realPath, res[:i])
		} else {
			if !strings.HasPrefix(res[i], "../") {
				res[i] = realPath
			}
		}
	}
	return res
}

func copyReadme(to, from string) {
	sourceDoc, err := os.ReadFile(from)
	if err != nil {
		fmt.Println(fmt.Errorf("Не могу прочитать файл документации по адресу %v, ошибка: %v", from, err.Error()))
		os.Exit(1)
	}
	err = os.WriteFile(to, sourceDoc, 2)
	if err != nil {
		fmt.Println(fmt.Errorf("Не удалось записать файл документации по адресу %v, ошибка: %v", to, err.Error()))
		os.Exit(1)
	}
	fmt.Printf("Успешно записан файл документации по адресу %v\n", to)
}

func copyReadmeFilesToPatternsInThePath(path string) {
	docsPath := ""
	switch {
	case strings.Contains(path, "oop-patterns"):
		docsPath = "../oop-patterns"
		break
	case strings.Contains(path, "fp-patterns"):
		docsPath = "../fp-patterns"
		break
	default:
		fmt.Println(fmt.Errorf("Неизвестно где искать документацию для паттернов, находящихся в %v", path))
		os.Exit(1)
	}
	patternFolders := getSliceOfDirNames(path)
	for _, pattern := range patternFolders {
		fullReadmeFilePath := path + "/" + pattern + "/" + "README.md"
		docPath := docsPath + "/" + pattern + ".md"
		copyReadme(fullReadmeFilePath, docPath)
	}
}
func main() {
	// Потенциально можно будет добавлять новые папки с паттернами
	// например react или node, и они сюда попадут
	// важно, чтобы папки, содержащие паттерны имели в названии "patterns"
	languages := returnOnlyLanguages(getSliceOfDirNames(rootFolder))
	for _, l := range languages {
		// [../../go/fp-patterns ../../go/oop-patterns/behavioral-patterns ...]
		pathsToPatterns := assemblePathsToPatterns(rootFolder+l, []string{})

		for _, p := range pathsToPatterns {
			copyReadmeFilesToPatternsInThePath(p)
		}
	}
}
