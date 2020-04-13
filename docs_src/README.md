[TOC]

# 設計書をWEBで公開、管理していこう

## 概要

設計書をWEBで公開、管理する方法を説明します。
以下要領にそって環境構築およびドキュメント作成、管理の方法を学んでください。

## 要領

1. GitBookとは

	ドキュメント作成にはGitBookというツールを利用します。GitBookはマークダウン形式で記述するドキュメント作成ツールで、HTML化したものをGithubのpagesに公開することができます。マークダウン形式で作成できるので、Githubで履歴管理や、更新時の差分比較を容易に行うことができます。また、UMLやSwaggerなどもpluginを使うことで利用可能となり、全てを全文検索することもできるツールです。	

2. ドキュメントの管理フロー


3. まずは環境を用意しよう
	1. `JDK` or `JRE` のインストール
	最新版をインストールしてください。
	[JREはこちら](https://java.com/ja/download/)
	
	2. `Node.js`のインストール
	ここからインストーラ落として入れるだけ
	[Node.js](https://nodejs.org/en/)
	
	インストールが終わったらコマンドプロンプトを立ち上げて以下を実行

	~~~
	$ node --version
	~~~
	`v**.**.**` って表示されたらインストールはOK  
	ついでにnpmも使えるようになっているか確認しましょう。  
　　　　同じくコマンドプロンプトで以下を実行
	
	~~~
	$ npm --version
	~~~

	`*.**.**` って表示されればOKです。
	
	3. `GitBook`のインストール
	npmを利用してインストールを行います。  
	GitBookはクラウドサービスですが、今回はローカルで作成を行っていくので、ローカルで利用できるようにする`gitbook-cli`というツールを導入します。  
	コマンドプロンプトを立ち上げて以下を実行
	
	~~~
	$ npm install --global gitbook-cli
	~~~

	インストールが終わったらコマンドプロンプトを立ち上げて以下を実行

	~~~
	$ gitbook --help
	~~~
	
	以下が表示されれば`gitbook-cli` のインストールは成功しました
	
	~~~
	$ gitbook --help
	
	Usage: gitbook [options] [command]
	
	Options:
	
	    -v, --gitbook [version]  specify GitBook version to use
	    -d, --debug              enable verbose error
	    -V, --version            Display running versions of gitbook and gitbook-cli
	    -h, --help               output usage information
	
	Commands:
	
	    ls                        List versions installed locally
	    current                   Display currently activated version
	    ls-remote                 List remote versions available for install
	    fetch [version]           Download and install a <version>
	    alias [folder] [version]  Set an alias named <version> pointing to <folder>
	    uninstall [version]       Uninstall a version
	    update [tag]              Update to the latest version of GitBook
	    help                      List commands for GitBook
	    *                         run a command with a specific gitbook version
	~~~
	
	4. `gitbook-plugin-uml`のインストール
	UMLをマークダウン形式で記載できるツールです。マークダウン化することで、フローダイアグラムを文字化できるので、フローの変更も全文検索や修正時の差分比較が可能になります。
		1. `gitbook-plugin-uml`には事前に`Graphviz`をインストールする必要があります。
		以下サイトからダウンロードしてインストールします（`msi`形式を選択）  
		[Graphviz](https://graphviz.gitlab.io/_pages/Download/Download_windows.html)
		
		インストールが完了したら環境変数に以下を設定してください  

		> `GRAPHVIZ_DOT` C:\Program Files (x86)\Graphviz2.38\bin\dot.exe

		値は`Graphviz`をインストールした場所によって変更してください。
		
		2.`gitbook-plugin-uml`をインストールする
		コマンドプロンプトを立ち上げて以下を実行  
		（コマンドの実行はGithubから既存のドキュメントをfetchした後に実行してください）
		
		~~~
		$ gibook install
		~~~
		既存のドキュメントファイル群の中にある`book.json`の中に必要なplugin一覧が記載されており、それらを一括してインストールしてくれます。  
		~~~
		[book.json]
		{
		  "plugins": [
		    "-sharing",
		    "hide-published-with",
		    "livereload",
		    "uml"          <--　これがUML_Pluginを使うための宣言
		  ],
		  "pluginsConfig": {
		    "uml": {
		      "charset" : "UTF-8"  <-- これがUMLの設定
		    }
		  }
		}
		~~~
4. ドキュメントを作ってみよう

	1. Githubからドキュメントファイル群をFetchする
	フォルダ構成は以下のようになっていると思います。
	
	~~~
	XXXXX　　　　　　リポジトリーのトップフォルダ
	 ├ assets
	 ├ docs　　　　　公開されるドキュメント
	 ├ node_modules
	 └ docs_src　　　　　　変換前のテキストドキュメント（このファイルをソース管理する）
	 　 ├ md
	 　 ├ node_modules
	 　 ├ book.json
	 　 ├ README.md　トップページかつGitにも表示されるリポジトリー説明ファイル
	 　 └ SUMMARY.md　目次ファイル
	~~~
	
	2. 必要なプラグインをインストールしよう
	はじめてローカルでドキュメントを作成する場合は必要なプラグインをインストールしましょう
		1. リポジトリーのトップフォルダに移動
		2. コマンドプロンプトを立ち上げて以下を実行  
		
		~~~
		$ gibook install
		~~~
	3. ドキュメントをローカルで可視化しよう
	修正したドキュメントを可視化（HTML）して、ローカル環境で見えるようにしましょう  
		1. リポジトリーのトップフォルダに移動  
		2. コマンドプロンプトを立ち上げて以下を実行
		
		~~~
		$ gitbook serve src docs
		~~~

		3. 実行が終わると以下URLからドキュメントが参照できるようになります。
		[http://localhost:4000]
		この状態でドキュメントファイル(****.md）を修正すると常時ページが更新されて、最新のページを見ることができます。  
		作業が終わったらコマンドプロンプトは`Ctrl-C`で終了させてください。

5. 修正したドキュメントをGitにアップしよう。
	1. 不要なファイルを削除する。
	作業フォルダには`_tmp_**********`というフォルダ群が作成されています。これはローカルで可視化する際に作成された一時フォルダ群なので不要です。  
	不要なファイル群をリポジトリーに`pull`しないよう事前に削除しましょう。
	
	2. 修正ファイルを`PullReq`する
	修正内容がコミットされればGitのpagesで参照できるようになります。