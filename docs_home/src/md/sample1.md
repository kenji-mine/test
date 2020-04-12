# Markdownの基本

## リンク

* ページ内リンク(internal link)

  * `[Link Text](#<header>)`

    (例)[同ページの数式に飛ぶ](#数式)

  * `[Link Text](/path/to/file.md#<header>)`

    (例)[自分が作成した違うページに飛ぶ](toygitbook.md#使用可能な主な機能)

* ページ外リンク(external link)

  * `[Link Text](URL)`

    (例)[Google](https://www.google.com/)

## 数式

文章内の数式は`$数式$`のようにシングルダラー\$で囲むのでなく,ダブルダラー\$\$で囲む.

例えば$$a=1$$.

数式ブロックは通常通り\$\$→改行→数式→改行→\$\$と書く
$$
\sum_{i=1}^n a_i
$$


