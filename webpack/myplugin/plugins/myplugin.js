class FileList {
    static defaultOptions = {
        outputFile: 'README.md',
    };

    constructor(options = {}) {
        this.options = { ...FileList.defaultOptions, ...options };
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileList', (compilation, cb) => {
            const fileListName = this.options.outputFile;
            // compilation.assets有我们所有的资源文件
            let len = Object.keys(compilation.assets).length;
            
            let content = `# 一共有${len}个文件\n\n`;
            // 遍历资源文件，获取name进行拼接
            for (let filename in compilation.assets) {
                content += `- ${filename}\n`
            }
             // 在compilation.assets这资源对象中新添加一个名为fileListName的文件
            compilation.assets[fileListName] = {
                // 文件内容
                source: function () {
                    return content;
                },
               
            }
        })
    }
}

module.exports = FileList;
