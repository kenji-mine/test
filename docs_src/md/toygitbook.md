# GitBook

## 概要

このサイトは`gitbook`というツールを使って,マークダウン 形式で書いた複数のファイル(拡張子`.md`)からホームページを作成し,`GitHub`の`GitHub Pages`というサービスを用いて公開しています.数式が無いマークダウンファイルを共有する場合は`GitHub`でpublicのrepositoryを作成して,その中にマークダウンファイルを配置すれば共有できます(そっちの方が簡単です).マークダウン に数式がある場合,もしくは目次をキチンと作成したい場合はこのページの作り方を参考にして下さい(**Mac**で作成する前提で書いています)

## 注意点

- `GitBook`で作成したホームページで数式に対して自動で番号を振り分ける機能を導入する方法は分かっていません(知ってる人がいたら教えて下さい)

- 既に共有したい数式を含んだマークダウンファイルが大量にある場合は多少作業が面倒になる可能性があります.以下,私が今のところ把握してるルールです

  - 文章内の数式(inline)は\$数式\$でなく\$\$数式\$\$と書き直す必要がある

    - \$数式\$を\$\$数式\$\$に変換するコマンド(**ファイルが上書きされるのでbackupを初めにとるように**)

      - 成功

        `sed -i '' 's/\$\{1\}[^$]*[^\\]\$\{1\}/$&$/g' /path/to/file`

      - 失敗コマンド1(自分メモ用)

        先頭以外の\$数式\$を\$\$数式\$\$に変換

        `sed -i '' 's/\([^\\]\)\(\$\{1\}.*[^\\\$]\$\{1\}\)/\1$\2$/g' /path/to/file`

      - 失敗コマンド2(自分メモ用)

        先頭の\$数式\$を\$\$数式\$\$に変換

        `sed -i '' 's/^\$\{1\}.*[^\\]\$\{1\}/\$&\$/' /path/to/file`

  - 数式内に日本語は使えない

  - 数式中の通常文字は`{\rm 通常文字}`は使えず,`\text{通常文字}`という風に記入する必要あり

    

## 使用可能な主な機能

- [ページ内/外へリンクを貼ることができる(ページ内の場合はheaderまで指定可能)](https://www.garyng.xyz/gtil-gitbook/GitBook/relative-internal-links-in-gitbook.html)
- mathjax-commonhtmlのpluginを用いて数式を埋め込むことができる
- 検索をかけれる
- 画像を埋め込むことができる(動画については動作未確認)

- Gitbook + Jenkins + WEBhock で自動化
- https://akerun.hateblo.jp/entry/2017/12/26/110102
- PlantUML を使う場合は以下
- https://gitbook-tutorial.firebaseapp.com/pages/diagram.html

## UML sample
```uml
@startuml

	Class Stage
	Class Timeout {
		+constructor:function(cfg)
		+timeout:function(ctx)
		+overdue:function(ctx)
		+stage: Stage
	}
 	Stage <|-- Timeout

@enduml
```





