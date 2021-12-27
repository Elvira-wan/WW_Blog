# 命令行



## Linux

- `cd <catalog name>`
  - `cd /`：切换到根目录
  - `cd ../`：切换到上级目录
  - `cd ～`：切换到home目录
  - `cd -`：切换到上次访问目录
- `ls [-al]`
  - `ls`：查看所有
  - `ls -a`：查看所有(包括隐藏)
  - `ls -l` or `ls ll`：列表查看所有(显示更多信息)
  - `ls /dir`：指定目录下所有
- `mkdir <dir>`：创建目录或文件
- `rm <dir name>` 
  - `rm <dir name>` 删除当前目录下文件
  - `rm -r <catalog name>`：递归删除当前目录下目录
  - `rm -rf *`：删除当前目录下所有目录及文件
  - `rm -rf /*`：删除根目录下所有的目录及文件
  - `-f` 参数：表示不询问直接删除
- `mv` and `cp`
  - `mv <now cata name> <new cata name>`：重命名目录
  - `mv <now cata location> <new cata location>`：剪切目录
  - `cp -r <now cata location> <new cata location>`：拷贝目录
- `find <cata name> <参数> <dir name>`
- 文件增删改查：
  - `touch <dir name>`：新建文件
  - `rm -rf <dir name>`：删除文件
  - `vi <dir name>`：修改文件(`:wq` 保存并退出编辑模式)
  - `cat/more/less/tail <dir name>`：查看文件
- `pwd`：查看当前目录
- `ps-ef`：查看进程
- `kill <进程号>`：结束进程
- `clear`：清屏



## VIM









#### 