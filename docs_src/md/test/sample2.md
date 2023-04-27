# [C001:Common Login API] 
`PUT` /{costmer}/login

# 1. Overview
ログイン処理を行う

# 2. Flow Diagram  
ＵＭＬの確認をします。


```uml
@startuml
actor Foo1 #red
boundary Foo2 #green
control Foo3
entity Foo4
database Foo5
collections Foo6
Foo1 -> Foo2 : To boundary
Foo1 -> Foo3 : To control
Foo1 -> Foo4 : To entity
Foo1 -> Foo5 : To database
Foo1 -> Foo6 : To collections

alt Key is "aaa"
	Foo1 -> Foo3 : Call:API_1
	loop while cnt > 1
		Foo1 -> Foo2 : Add queue N20
		Foo1 -> Foo1 : cnt = cnt  -1
	end
else otherwise
	Foo2 -> Foo3 : Call:API_2
end alt

@enduml
```  
分類子や制御、矢印の種類等、記載方法は以下
[https://plantuml.com/ja/sequence-diagram]


# 3. Detail
## 1. ログイン処理
-Data Access Definition  

| テーブル名 | C | R | U | D | 外部結合 | 結合条件 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| customer | |*| | | | cstmr_code = request.cstmer_code  |
| user | |*| | | | cstmr_code = customer.cstmer_code {{br}} user_code = request.usr_code {{br}} password = request.pswd |

## 2. ログイン判定
| 値 | 判定条件 | 処理 |
| :--- | :--- | :---|
| 1.user | 存在する | 処理３へ |
| | 存在しない | 終了 |

## 3. ログイン履歴登録
-Data Access Definition  

| テーブル名 | C | R | U | D | 外部結合 | 結合条件 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| customer | |*| | | | cstmr_code = request.cstmer_code  |
| user | |*| | | | cstmr_code = customer.cstmer_code {{br}} user_code = request.usr_code {{br}} password = request.pswd |
| history |*| | | | | cstmr_code = request.cstmer_code  |

## 4.DB Change Definition
| テーブル名 | 処理番号 | 
| :--- | :--- | 
| history | 3 |
| **カラム名** | **設定値** |
| cstmer_code | request.cstmer_code |
| user_code | request.usr_code |
| login_date_time | sysdate() |

## 5.Request Parameter
| パラメータ | 属性 | 必須 | データ型 | 最小値 | 最大値 | フォーマット補足 |
| :--- | :---: | :---: | :--- | ---: | ---: | :--- |
| cstmer_code | Path | * | String | 1 | 6 | | 
| usr_code | Post | * | String | 1 | 10 | |
| pswd | Post| * | String | 1 | 10 | [0-9][a-Z][-@?] |

## 6.Responce Parameter
-レスポンスコード:200

| パラメータ | 必須 | データ型 | 値 | 補足 |
| :--- | :---: | :--- | :--- | :--- |
| result | * | boolean | 2.result | true:認証成功<BR> false:認証失敗 |
| reason | | number | | result=false の場合のみセット<BR> 1:パスワード無効<BR> 2:パスワード間違い |

## 7.Others
