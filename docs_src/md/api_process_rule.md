# AP設計書

## 概要

以下にAPI設計書の記載ルールを説明します。  

## 章立て

API設計書では以下章立てで記載をします。
~~~
Title
1. Overview
2. Flow Diagram
3. Detail
4. DB Change Definition
5. Request Parameter
6. Responce Parameter
7. Others
~~~  

## Title
1.API名を記載します。  
`[APIコード：API名]`  
__APIコード__  
`区分コード` + XXXX（ゼロ埋め連番4桁）  

|区分コード|値|
|:---|:---:|
|共通|C|
|ここは相談して決める<TODO>　|　|  

2.Pathを記載します。
`HTTPメソッド path`　で記載します。  
pathで渡す変数名も記載してください。  
以下はサンプルです。  
`PUT /{costmer}/login`

__HTTPメソッド__  

|HTTPメソッド|用途|
|:---|:---|
|GET|データの取得を行う場合に用いる。<BR>キャッシュ対応となってよい場合に限る。|
|POST|冪等性がない処理に対して用いる。<BR>例：データの追加など|
|PUT|冪等性がある処理に対して用いる。<BR>例：ステータスの変更処理など|  
冪等性(べきとうせい、idempotency, idempotence)とは、**同じ操作を何度繰り返しても、同じ結果が得られるという性質**です。冪等性がある操作(idempotent operation)は、1回操作した場合の結果と、2回以上操作した場合の結果は同じになります。  

## Overview
処理概要を記載します。

## Flow Diagram
処理フローを記載します。  
記載にはUMLを用います。  
	
```uml
@startuml
participant Client
participant Own
participant Sync
participant Ansync
entity Queue
database DB
Client -> Own:  Call API
Own -> Own : 1. c=c+1
Own <-> Sync : 2. Call [C0001]
Own -> Ansync : 3. Call [M0001]
Ansync --> Own : XX Response
Own -> Queue : 4. Add queue [Z0001]
Own -> DB : 5. Update [t_usr]
Own -> Client : Return response
@enduml
```  

__要素__  
要素には以下を記載します。  

|要素名|内容|
|:---|:---|
|Client|アプリやブラウザ等|
|Own|記載中のAPI|
|Sync|サーバサイドの同期API|
|Ansync|サーバサイドの非同期API|
|Queue|バックエンドのQueueサーバ(Kafkaなど)|
|DB|データベース、キャッシュサーバなど|  

__呼び出し処理__  
他のAPI呼び出し処理を記載します。  
`呼び出し元要素名 -> 呼び出し先要素名 : 処理番号. Call [API番号]`　と記載します。  
`Own`から非同期API（M0001）を処理１で呼ぶ処理の場合  
`Own -> Ansync : 1. call [M0001]` と記載します。  
```uml
@startuml
participant Own
participant Ansync
note over Own,Ansync: 非同期でM0001を呼びます。
Own -> Ansync: 1. call [M0001]

@enduml
```  

__計算処理__  
計算処理（内部処理）を記載します。  
`Own -> Own : 処理番号. 処理概要` と記載します。  
内部処理１でカウントアップする処理の場合  
```uml
@startuml
participant Own
note over Own: 内部処理は自分自身に矢印を引きます。
Own -> Own: 1. N = N + 1

@enduml
```  
__条件分岐__  
条件分岐処理を記載します。
~~~
alt 条件式
	
else 条件式

end alt
~~~  
と記載します。  
`dataKnd = 1`の時、非同期処理M0001を、`dataKnd = 2`の時、非同期処理M0002を、それ以外の時は非同期処理M0003を呼ぶ処理の場合```uml
@startuml
participant Own
participant Ansync
note over Own,Ansync: 1. dataKndの値で後続の処理を呼び分けます。<BR>altの前にalt内の処理概要を記載
alt dataKnd = 1
	note right of Own : 各条件の処理内で各々の処理番号と内容を記載
	Own -> Ansync: 1.1. call [M0001]
else dataKnd = 2
	Own -> Ansync: 1.2. call [M0002]
else otherwise
	Own -> Ansync: 1.3. call [M0003]
end alt
@enduml
```  

__繰り返し処理__  
繰り返し処理を記載します。
~~~
loop 条件式
	
end
~~~  
と記載します。  
`cnt > 1`の時、非同期処理M0001を呼ぶ処理の場合

```uml
@startuml
participant Own
participant Ansync
note over Own,Ansync: cnt > 1 の限りM0001を呼びます。
loop while cnt > 1
	Own -> Ansync: 1.1. call [M0001]
end
@enduml
```  
__DBアクセス処理__  
DBアクセス処理を記載します。  
`呼び出し元要素名 -> DB要素名 : 処理番号. 処理 [テーブル名]`　と記載します。  
`Own`から`t_member`テーブルに対して処理１でUpdate処理を行う場合  
`Own -> DB : 1. Update [t_member]` と記載します。  
```uml
@startuml
participant Own
database DB
Own -> DB : 1. Update [t_member]
@enduml
```  
## Detail
Flow Diagram　で記載した処理番号に対する処理詳細を記載します。
`処理番号`. `処理概要`
処理番号、処理概要の詳細については以下状況によって記載をしてください。
1. 呼び出し処理  
	呼び出し処理には**Call Definition**を記載してください。  
	以下はサンプルです。  
	***
	##1. 非同期APIをコールする
	- Call Definition
	![](../img/api_process_rule_1.png)
	***

2. 計算処理（内部処理）  
	内部処理は処理内容を記載してください。  
	以下はサンプルです。  
	***
	##1. 変数の格納
	request.list.bean.data1をカンマでSplitし、変数local_array_1にセットする 
	***

3. 条件分岐  
	条件分岐は条件とそれぞれの振る舞いを記載してください。  
	条件分岐では必ず`otherwise`を記載してください。  
	以下はサンプルです。
	***
	##1. ステータスに応じて後続処理を呼び分ける
	![](../img/api_process_rule_2.png)
	***

4. DBアクセス処理
	呼び出し処理には**Data Access Definition**を記載してください。  
	以下はサンプルです。  
	***
	##1. ユーザ情報を取得する
	- Data Access Definition
	![](../img/api_process_rule_3.png)
	***

## DB Change Definition
Detail内に記載した**Data Access Definition**に対するDB更新処理を記載します。  
記載はテーブル単位です。  
複数の処理で同じテーブルを更新する場合は、処理番号単位で列を追加してください。  
以下はサンプルです。
***
| テーブル名 | 処理番号 | 
| :--- | :--- |
| history | 3 |
| **カラム名** | **設定値** |
| cstmer_code | request.cstmer_code |
| user_code | request.usr_code |
| login_date_time | sysdate() |

***

## Request Parameter
APIを呼ばれる時の引数を記載します。  
属性には(`Path/Post/Put/Get`)を記載してください。  
データに制限（取り得る値が決まっている）がある場合は、フォーマット補足に条件を記載してください。 
以下はサンプルです。
***
| パラメータ | 属性 | 必須 | データ型 | 最小値 | 最大値 | フォーマット補足 |
| :--- | :---: | :---: | :--- | ---: | ---: | :--- |
| cstmer_code | Path | * | String | 1 | 6 | | 
| usr_code | Post | * | String | 1 | 10 | |
| pswd | Post| * | String | 1 | 10 | [0-9][a-Z][-@?] |

***

## Responce Parameter
返り値を記載します。  
返り値はレスポンスコード単位で記載します。  
以下はサンプルです。
***
- レスポンスコード:200

| パラメータ | 必須 | データ型 | 値 | 補足 |
| :--- | :---: | :--- | :--- | :--- |
| result | * | boolean | 2.result | true:認証成功<BR> false:認証失敗 |
| reason | | number | | result=false の場合のみセット<BR> 1:パスワード無効<BR> 2:パスワード間違い |
***

## Others
その他設計で気を付ける点等があればここに記載してください。  
例えば**Data Access Definition**で副問い合わせや分析関数など複雑なコーディングを求める場合、設計者の意図を開発者に伝えるための情報として、この章にサンプルのSQLを記載するなどが考えられます。  
