//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Composite (КОМПОНОВЩИК)
// ЦЕЛЬ: создать удобную структуру из объектов в виде дерева
// ПРИМЕНЕНИЕ: система компонентов в современных фронтенд фреймворках,
// html дерево и т.п.

// Есть группа определённых связанных классов/объектов, связи между
// которыми удобно оформить в виде дерева, например File и Folder, где
// Folder может содержать несколько файлов и папок, а так же содержит
// метаданные, а File содержит только метаданные
class SomeFile {
  public name: string;
  // класс File назван SomeFile т.к. WebAPI в JS уже имеет встроенный класс File
  constructor(name: string) {
    this.name = name;
  }
}

class Folder {
  private files: SomeFile[] = [];
  private folders: Folder[] = [];
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public addFolder = (folder: Folder): void => {
    this.folders.push(folder);
  };
  public addFile = (file: SomeFile): void => {
    this.files.push(file);
  };
  public printDataInside = (): void => {
    console.log(`\nПапка с названием ${this.name} содержит файлы:`);
    if (this.files.length === 0) {
      console.log('ФАЙЛЫ ОТСУТСТВУЮТ');
    } else {
      for (let file of this.files) {
        console.log(`${file.name}`);
      }
    }
    console.log(`\nИ папки:`);
    if (this.folders.length === 0) {
      console.log('ПАПКИ ОТСУТСТВУЮТ');
    } else {
      for (let folder of this.folders) {
        console.log(`${folder.name}`);
      }
    }
  };
  public static RecursivePrint = (folder: Folder): void => {
    folder.printDataInside();
    const subFolders = folder.folders;
    if (subFolders) {
      for (let folder of subFolders) {
        this.RecursivePrint(folder);
      }
    }
  };
}

// const file1 = new SomeFile('file1.jpg');
// const file2 = new SomeFile('file2.png');
// const file3 = new SomeFile('file3.txt');
// const file4 = new SomeFile('file4.js');
// const file5 = new SomeFile('file5.ts');
// const file6 = new SomeFile('file6.go');
// const file7 = new SomeFile('file7.ogg');
// const file8 = new SomeFile('file8.doc');
// const file9 = new SomeFile('file9.css');
// const file10 = new SomeFile('file10.yml');

// const folder1 = new Folder('folder1');
// const folder2 = new Folder('folder2');
// const folder3 = new Folder('folder3');
// const folder4 = new Folder('folder4');
// const folder5 = new Folder('folder5');

// folder1.addFolder(folder2);
// folder1.addFolder(folder3);
// folder1.addFile(file1);
// folder1.addFile(file2);
// folder1.addFile(file3);
// folder2.addFolder(folder4);
// folder2.addFile(file4);
// folder3.addFile(file5);
// folder3.addFile(file6);
// folder3.addFile(file7);
// folder4.addFolder(folder5);
// folder5.addFile(file8);
// folder5.addFile(file9);
// folder5.addFile(file10);

// Folder.RecursivePrint(folder1);
