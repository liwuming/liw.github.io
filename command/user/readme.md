
# useradd -- 添加用户

## name -- 


## SYNOPSIS -- 使用方式
1.

2.
useradd -D [options]
useradd [options] LOGIN


## description-- 描述


## options--常用选项 



-g 
-G 指定用户所属附加组，可以是group name也可以是gid，当属于多个gid时，
-s,--shell,为用户指定默认的shell
-r,--shell,创建系统用户



常用选项
-u，
-d，指定家目录
-s，--shell，指定用户的默认shell

:::warning
为新用户设置默认shell时，需保障当前环境存在所指定的shell，那如何查看当前系统有那些可用shell呢
:::


```shell
liwuming@DESKTOP-LD577G5:~$ cat /etc/shells
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
```

疑惑：valid login shells


login shell和no-login shell



-r，--system，创建系统用户
-M，不创建用户主目录
-f，--
-D，显示添加用户时的默认配置信息
-D option value:用户修改默认配置信息

修改之后的配置信息保存在/etc/default/useradd文件中



注意：
创建用户时的默认配置信息设置在/etc/login.defs




umask是什么



https://linuxhandbook.com/login-shell/





# usermod -- 修改用户信息

常用选项:
- -u，--uid,修改指定uid
- -g，--gid,修改所属基本组
- -G，--groups，修改用户所属附加组

:::warning
`-G`选项默认会进行覆盖操作，若期望在原有基础上进行追加，则需要`-a`选项的帮助
:::
- -a，--append，与-G选项一起使用，用于为用户追加新的附加组
- -c，--comment comment_msg，修改注释信息
- -d，--home home_dir，修改用户的家目录
:::warning
使用`-d`选项时需注意，若原来家目录下有文件，-d选项不会移动原有数据，可能会造成数据丢失，若期望修改家目录并移动移动家目录下的文件，则选择`-m`选项的配合
:::
- -m,--move-home，只能与-d选项一起使用时生效，用于将原家目录及其子目录文件移动到新目录


-l，--login new_uname,
-s，--shell,
-l，--lock，锁定用户密码
-U,--unlock，解锁用户密码



使用频率较多的命令，-G



# userdel -- 删除用户
- -r，删除用户家目录
> 在删除用户时，默认并不删除家目录，除非添加了`-r`选项




useradd gentoo -g gentoo -G 5000 5001


# passwd -- 修改用户密码

## name -- 功能释义
> change user password

## synopsis -- 使用说明
passwd [options] [LOGIN]


## description -- 详细描述
> The passwd command changes passwords for user accounts. A normal user may only change the password for their own account, while the superuser may change the password for any account.  passwd also changes the account or associated password validity period.

1.普通用户仅可以修改自己的账户密码，但超级管理员可以修改任何账户密码(直接更改)
2.passwd命令还可用来修改密码的有效期



- validity　正确，合法，
- period 时代，


正则表达式

用户管理
进程管理
软件包的安装













awera 意识到

probably 可能，大概，或许



validity 

period 有效期，

interactive 交互


revisit
invoked 调用
 
at the same time

