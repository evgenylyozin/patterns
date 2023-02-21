package main

import "fmt"

// Есть группа определённых связанных классов/объектов, связи между
// которыми удобно оформить в виде дерева, например File и Folder, где
// Folder может содержать несколько файлов и папок, а так же содержит
// метаданные, а File содержит только метаданные
type file struct {
	name string
}

type folder struct {
	files   []*file
	folders []*folder
	name    string
}

func (f *folder) addFolder(folder *folder) {
	f.folders = append(f.folders, folder)
}
func (f *folder) addFile(file *file) {
	f.files = append(f.files, file)
}

func (f *folder) printDataInside() {
	fmt.Printf("\nПапка с названием %v содержит файлы:\n", f.name)
	if len(f.files) == 0 {
		fmt.Println("ФАЙЛЫ ОТСУТСТВУЮТ")
	} else {
		for _, file := range f.files {
			fmt.Printf("%v\n", file.name)
		}
	}
	fmt.Println("И папки:")
	if len(f.folders) == 0 {
		fmt.Println("ПАПКИ ОТСУТСТВУЮТ")
	} else {
		for _, folder := range f.folders {
			fmt.Printf("%v\n", folder.name)
		}
	}
}
func recursivelyPrintFoldersData(folder folder) {
	folder.printDataInside()
	subFolders := folder.folders
	if len(subFolders) > 0 {
		for _, subfolder := range subFolders {
			recursivelyPrintFoldersData(*subfolder)
		}
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ------------------------------- Клиентский код -------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
func main() {
	file1 := &file{name: "file1.jpg"}
	file2 := &file{name: "file2.png"}
	file3 := &file{name: "file3.txt"}
	file4 := &file{name: "file4.js"}
	file5 := &file{name: "file5.ts"}
	file6 := &file{name: "file6.go"}
	file7 := &file{name: "file7.ogg"}
	file8 := &file{name: "file8.doc"}
	file9 := &file{name: "file9.css"}
	file10 := &file{name: "file10.yml"}

	folder1 := &folder{name: "folder1"}
	folder2 := &folder{name: "folder2"}
	folder3 := &folder{name: "folder3"}
	folder4 := &folder{name: "folder4"}
	folder5 := &folder{name: "folder5"}

	folder1.addFolder(folder2)
	folder1.addFolder(folder3)
	folder1.addFile(file1)
	folder1.addFile(file2)
	folder1.addFile(file3)
	folder2.addFolder(folder4)
	folder2.addFile(file4)
	folder3.addFile(file5)
	folder3.addFile(file6)
	folder3.addFile(file7)
	folder4.addFolder(folder5)
	folder5.addFile(file8)
	folder5.addFile(file9)
	folder5.addFile(file10)

	recursivelyPrintFoldersData(*folder1)
}
