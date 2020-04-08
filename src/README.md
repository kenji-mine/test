[TOC]

# このサイトの作り方(GitBookを用いて公開用の簡易的なサイトを作成)

## 概要

このサイトを作る具体的な手順を説明する

[GitBookを用いた共有サイト作成の概要と注意点はココをクリック](./md/toygitbook.md)



## 作成詳細

1. [Node.jsをインストール](https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09)

   GitBookを使うのに必要なNode.jsをインストールします.手順は上記サイトを参考にしてください

2. [GitBookでホームページ(HTML)を作成するサンプル](https://tatsuyashi.hatenablog.com/entry/2018/08/01/023325)

   (必要ないかも) 上記を参考にしてこのサイトより簡単なページを自分で作成してみて下さい

3. このサイトを作成するための元ファイルを始めから書くのは面倒なので,以下のコマンドで持ってくる(25MB)
   `$git clone https://github.com/akirat1993/ToyGitBook.git`

   ディレクトリ構造は以下になっているはず

   ```
   ToyGitBook/
   	src/
   		README.md
   		SUMMARY.md
   		book.json
   		md/
   			sample1.md
   			toygitbook.md
   	docs/
   ```

4. Gitの管理下から外す+作成済みのホームページ(`docs/`以下)を削除する

   `$cd ToygitBook`

   `$rm -rf .git`

   `$rm -rf docs`

5. 目次を`src/SUMMARY.md`で作成する.(`git clone`をしている場合は作成済み)

   ```markdown
   # Summary
   
   * [このサイトの作り方](./README.md)
   * サンプル
   	* [サンプル1](./md/sample1.md)
   	* [サンプル2](./md/sample2.md)
   ```

   ※ファイルパスは`SUMMARY.md`から見た相対パスを表示

   ※`* [ホームページ上での表示](ファイルパス)`という風に階層的に記述

6. `src/SUMMARY.md`に記入したマークダウンファイルを作成

   `git clone`した場合は既に`src/README.md`,`src/md/sample1.md`,`src/md/toygitbook.md`ファイルが作成済みのはず.

7. 必要なパッケージを`src/book.json`に記載(`git clone`した場合は既に下記のように記載されているはず)

   ```json
   {
     "plugins": [
       "mathjax-commonhtml"
     ],
     "pluginsConfig": {
       "mathjax":{
           "forceSVG": true
       }
     }
   }
   ```

   `mathjax`は数式を扱うためのプラグイン

8. パッケージをインストール

   1. `book.json`があるディレクトリに移動

        `$cd ToyGitBook/src`

   2. パッケージをインストール

      `$gitbook install`

      →同じディレクトリ内にパッケージを含んでいる`node_modules`が作成される

9. ローカルにホームページ(`.html`ファイル)を作成+確認

   1. `$cd ToyGitBook`

   2. ホームページを作成+確認

      `$gitbook serve src docs`

      コマンドは`gitbook serve [SUMMARY.mdがあるディレクトリ] [ホームページの出力先]`

      →`Serving book on http://localhost:4000`と表示される

      →ブラウザ(Safariなど)を開いてURLに`http://localhost:4000`と打ち込むとホームページが表示される.(表示中に`src`以下のファイルをいじると表示がおかしくなる)

      →終了する場合はControl+Cなどで中断すれば良い.終了ごとに`docs`というディレクトリが作成されていることを確認

10. *GitHub*で共有

    1. *GitHub*で新規でpublicリポジトリを作成し`ToyGitBook`をその管理下におく.
    2. `Setting>GitHub Pages>Source`のところをNoneからmaster branch/docs folderに設定