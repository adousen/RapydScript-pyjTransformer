pyjTransformer for RapydScript in-browser  
==============================================

# Doc

``pyjTransformer.js`` is modified from the [JSXTransformer](http://facebook.github.io/react/downloads.html) in ReactJS.

## Functionality:

1. Auto compiles .pyj files or rapydscript code on page to javascript in browser.
2. Run RapydScript with external framework, such as jQuery, AngularJS, ReactJS and so on.

> **NOTE:** To run rapydscript in browser right with AngularJS(ensure that rapydscript compiles an executes before it), you should set attributes ``async="false"`` in the ``<script>`` tag. 
> To run it right with ReactJS, you should also set attributes ``async="false"`` in the ``<script>`` tag, and set ``otype="text/jsx"`` . 

Example:

```html

<script type="text/pyj" otype="text/jsx" src="helloworld.pyj" async="false"></script>

```

## RapydScript introduction

Rapydscript is a pre-compiler for JavaScript, similar to CoffeeScript, but with cleaner, more readable python-like syntax.


## links

* [RapydScript on Github](https://github.com/atsepkov/RapydScript)
* [RapydScript.com](http://RapydScript.com)
* [RapydScript.cn](http://RapydScript.cn/docs) simplified chinese docs online for RapydScript
* [Yoeman angularjs generator, surpport for RapydScript, Angular and Angular-ui](https://github.com/loolmeh/generator-rui-angular)
* [Django package for using the RapydScript javascript pre-compiler](https://github.com/pztrick/DjScript)
* [Language support for rapydscript (.pyj) in the Atom editor](https://github.com/tgienger/language-rapydscript)
* [auto compiles rapydscript .pyj files to .js on save](https://github.com/tgienger/Atom-rapydscript-auto-compile)


## demo

* [RapydLab](http://rapydscript.cn/rapydlab)
* [RapydScript ShowCases](http://salvatore.pythonanywhere.com/RapydScript)
* [RapydBox](http://salvatore.pythonanywhere.com/RapydBox/default/editor)

## others

* [glowscript：a project done by a member of community, surppot for webGL](http://www.glowscript.org/)


# 说明文档(中文)

``pyjTransformer.js`` 的代码是从ReactJS中的 [JSXTransformer](http://facebook.github.io/react/downloads.html) 改的。

## 实现的功能:

1. 自动将浏览器中的.pyj文件或页面上的的RapydScript代码编译成javascript代码。
2. 可以与jQuery、AngularJS、ReactJS等外部框架共同工作。

> **注意:** 要使RapydScript在浏览器中与AngularJS正确地工作（即保证rapydscript代码的编译和运行在AngularJS之前），你需要在 ``<script>`` 中添加属性 ``async="false"`` 。
> 要使RapydScript与ReactJS正常工作，你需要在 ``<script>`` 中添加属性 ``async="false"`` ，以及添加属性 ``otype="text/jsx"`` 。

示例:

```html

<script type="text/pyj" otype="text/jsx" src="helloworld.pyj" async="false"></script>

```

## RapydScript简介

RapydScript是一个可以被预编译为JavaScript的脚本语言。
RapydScript与CoffeeScript很相似，但是由于它采用的是Python的语法，因而更加容易阅读。

## links

* [RapydScript on Github](https://github.com/atsepkov/RapydScript)
* [RapydScript.com](http://RapydScript.com)
* [RapydScript.cn](http://RapydScript.cn/docs) 中文在线文档
* [Yeoman的项目生成工具，支持RapydScript,Angular,Angular-ui](https://github.com/loolmeh/generator-rui-angular)
* [在Django中使用RapydScript的python扩展程序包](https://github.com/pztrick/DjScript)
* [Atom编辑器的RapydScript语言支持包](https://github.com/tgienger/language-rapydscript)
* [Atom编辑器的RapydScript脚本文件自动编译插件](https://github.com/tgienger/Atom-rapydscript-auto-compile)


## 在线演示项目

* [RapydLab](http://rapydscript.cn/rapydlab)
* [RapydScript ShowCases](http://salvatore.pythonanywhere.com/RapydScript)
* [RapydBox](http://salvatore.pythonanywhere.com/RapydBox/default/editor)

## 相关项目

* [glowscript：RapydScript社区的项目，用于支持webGL编程](http://www.glowscript.org/)